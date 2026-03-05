import { useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';

// Definir tipo para la evaluación completa
interface EvaluacionCompleta {
  [key: string]: string | string[] | number | boolean | undefined;
}

export interface EvaluacionGuardada {
  id: string;
  estudiante: string;
  empresa: string;
  promedioCapacidades: string;
  promedioHabilidades: string;
  promedioActitudes: string;
  notaFinal: string;
  fechaEvaluacion: string;
  evaluacionCompleta: EvaluacionCompleta;
}

export function useCalificaciones() {
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionGuardada[]>([]);
  const [filteredEvaluaciones, setFilteredEvaluaciones] = useState<EvaluacionGuardada[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNota, setFilterNota] = useState('todos');
  
  const itemsPerPage = 10;

  // Cargar evaluaciones guardadas - optimizado para evitar setState síncrono
  useEffect(() => {
    const cargarEvaluacionesDesdeStorage = () => {
      try {
        const evaluacionesGuardadas = localStorage.getItem('evaluacionesGuardadas');
        if (evaluacionesGuardadas) {
          const evaluacionesParseadas = JSON.parse(evaluacionesGuardadas) as EvaluacionGuardada[];
          flushSync(() => {
            setEvaluaciones(evaluacionesParseadas);
            setFilteredEvaluaciones(evaluacionesParseadas);
          });
        } else {
          // Si no hay evaluaciones guardadas, verificar si hay una última evaluación
          const ultimaEvaluacion = localStorage.getItem('ultimaEvaluacion');
          if (ultimaEvaluacion) {
            const evaluacion = JSON.parse(ultimaEvaluacion);
            const nuevaEvaluacion: EvaluacionGuardada = {
              ...evaluacion,
              id: Date.now().toString()
            };
            const evaluacionesArray = [nuevaEvaluacion];
            flushSync(() => {
              setEvaluaciones(evaluacionesArray);
              setFilteredEvaluaciones(evaluacionesArray);
            });
            localStorage.setItem('evaluacionesGuardadas', JSON.stringify(evaluacionesArray));
          }
        }
      } catch (error) {
        console.error('Error al cargar evaluaciones:', error);
      }
    };

    cargarEvaluacionesDesdeStorage();
  }, []);

  // Agregar nueva evaluación - optimizado
  const agregarEvaluacion = useCallback((evaluacion: Omit<EvaluacionGuardada, 'id'>) => {
    const nuevaEvaluacion: EvaluacionGuardada = {
      ...evaluacion,
      id: Date.now().toString()
    };
    
    setEvaluaciones(prev => {
      const evaluacionesActualizadas = [...prev, nuevaEvaluacion];
      
      // Actualizar filteredEvaluaciones y localStorage en el mismo ciclo de render
      flushSync(() => {
        setFilteredEvaluaciones(evaluacionesActualizadas);
      });
      
      localStorage.setItem('evaluacionesGuardadas', JSON.stringify(evaluacionesActualizadas));
      
      // Limpiar última evaluación
      localStorage.removeItem('ultimaEvaluacion');
      
      return evaluacionesActualizadas;
    });
  }, []);

  // Filtrar y buscar evaluaciones - optimizado con useMemo
  useEffect(() => {
    const filtrarEvaluaciones = () => {
      let filtradas = [...evaluaciones];

      // Filtrar por búsqueda
      if (searchTerm) {
        filtradas = filtradas.filter(
          (evaluacion) =>
            evaluacion.estudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
            evaluacion.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
            evaluacion.notaFinal.includes(searchTerm)
        );
      }

      // Filtrar por nota
      if (filterNota !== 'todos') {
        if (filterNota === 'aprobado') {
          filtradas = filtradas.filter((evaluacion) => {
            const nota = parseFloat(evaluacion.notaFinal || '0');
            return nota >= 70;
          });
        } else if (filterNota === 'reprobado') {
          filtradas = filtradas.filter((evaluacion) => {
            const nota = parseFloat(evaluacion.notaFinal || '0');
            return nota < 70;
          });
        }
      }

      return filtradas;
    };

    const filtradas = filtrarEvaluaciones();
    
    // Usar flushSync para actualización síncrona cuando es necesario
    flushSync(() => {
      setFilteredEvaluaciones(filtradas);
      setCurrentPage(1);
    });
  }, [evaluaciones, searchTerm, filterNota]);

  // Paginación
  const totalPages = Math.ceil(filteredEvaluaciones.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvaluaciones = filteredEvaluaciones.slice(startIndex, startIndex + itemsPerPage);

  // Estadísticas
  const stats = {
    total: evaluaciones.length,
    aprobados: evaluaciones.filter(e => parseFloat(e.notaFinal || '0') >= 70).length,
    reprobados: evaluaciones.filter(e => parseFloat(e.notaFinal || '0') < 70).length,
    promedioGeneral: evaluaciones.length > 0 
      ? (evaluaciones.reduce((acc, e) => acc + parseFloat(e.notaFinal || '0'), 0) / evaluaciones.length).toFixed(1)
      : '0'
  };

  // Verificar si hay nueva evaluación al cargar - optimizado
  useEffect(() => {
    const interval = setInterval(() => {
      const ultimaEvaluacion = localStorage.getItem('ultimaEvaluacion');
      if (ultimaEvaluacion) {
        try {
          const evaluacion = JSON.parse(ultimaEvaluacion);
          agregarEvaluacion(evaluacion);
        } catch (error) {
          console.error('Error al procesar última evaluación:', error);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [agregarEvaluacion]);

  return {
    evaluaciones,
    filteredEvaluaciones,
    paginatedEvaluaciones,
    currentPage,
    totalPages,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    filterNota,
    setFilterNota,
    stats,
    agregarEvaluacion
  };
}
