import { useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { CalificacionService } from '../services/calificacionService';
import type { EvaluacionGuardada, CalificacionStats, FilterNota } from '../types';

export function useCalificaciones() {
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionGuardada[]>([]);
  const [filteredEvaluaciones, setFilteredEvaluaciones] = useState<EvaluacionGuardada[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNota, setFilterNota] = useState<FilterNota>('todos');
  
  const itemsPerPage = 10;

  // Cargar evaluaciones guardadas - optimizado para evitar setState síncrono
  useEffect(() => {
    const cargarEvaluacionesDesdeStorage = () => {
      try {
        const evaluacionesGuardadas = CalificacionService.getEvaluaciones();
        
        if (evaluacionesGuardadas.length === 0) {
          // Si no hay evaluaciones guardadas, agregar datos de ejemplo
          const ejemploAprobado: Omit<EvaluacionGuardada, 'id'> = {
            estudiante: "María García López",
            empresa: "Tech Solutions S.A.",
            promedioCapacidades: "85.5",
            promedioHabilidades: "88.0",
            promedioActitudes: "92.3",
            notaFinal: "88.6",
            fechaEvaluacion: "2024-03-15",
            evaluacionCompleta: {
              conocimientosTeoricos: ["85", "90", "82", "88"],
              seguimientoInstrucciones: ["88", "85", "90", "86"],
              organizacion: ["82", "88", "85", "87"],
              metodo: ["90", "85", "88", "84"],
              ritmoTrabajo: ["85", "88", "82", "89"],
              iniciativa: ["90", "85", "88", "86"],
              trabajoEquipo: ["88", "90", "85", "87"],
              puntualidadAsistencia: ["92", "88", "90", "89"],
              responsabilidad: ["90", "92", "88", "91"],
              relacionesInterpersonales: "Excelente colaboración con el equipo",
              adaptacionAmbiente: "Se adaptó rápidamente al entorno laboral",
              presentacionPersonal: "Siempre mantuvo una apariencia profesional"
            }
          };
          
          const nuevaEvaluacion = CalificacionService.addEvaluacion(ejemploAprobado);
          const evaluacionesArray = [nuevaEvaluacion];
          flushSync(() => {
            setEvaluaciones(evaluacionesArray);
            setFilteredEvaluaciones(evaluacionesArray);
          });
        } else {
          flushSync(() => {
            setEvaluaciones(evaluacionesGuardadas);
            setFilteredEvaluaciones(evaluacionesGuardadas);
          });
        }
      } catch (error) {
        console.error('Error al cargar evaluaciones:', error);
      }
    };

    cargarEvaluacionesDesdeStorage();
  }, []);

  // Agregar nueva evaluación - optimizado
  const agregarEvaluacion = useCallback((evaluacion: Omit<EvaluacionGuardada, 'id'>) => {
    const nuevaEvaluacion = CalificacionService.addEvaluacion(evaluacion);
    
    setEvaluaciones(prev => {
      const evaluacionesActualizadas = [...prev, nuevaEvaluacion];
      
      // Actualizar filteredEvaluaciones en el mismo ciclo de render
      flushSync(() => {
        setFilteredEvaluaciones(evaluacionesActualizadas);
      });
      
      return evaluacionesActualizadas;
    });
  }, []);

  // Filtrar y buscar evaluaciones - optimizado
  useEffect(() => {
    const filtrarEvaluaciones = () => {
      let filtradas = CalificacionService.filterBySearch(evaluaciones, searchTerm);
      filtradas = CalificacionService.filterByNota(filtradas, filterNota);
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
  const stats: CalificacionStats = CalificacionService.calculateStats(evaluaciones);

  // Verificar si hay nueva evaluación al cargar - optimizado
  useEffect(() => {
    const interval = setInterval(() => {
      if (CalificacionService.hasPendingEvaluation()) {
        try {
          CalificacionService.processPendingEvaluation();
          // Recargar evaluaciones
          const evaluacionesActualizadas = CalificacionService.getEvaluaciones();
          setEvaluaciones(evaluacionesActualizadas);
          setFilteredEvaluaciones(evaluacionesActualizadas);
        } catch (error) {
          console.error('Error al procesar última evaluación:', error);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
