import type { EvaluacionGuardada } from '../types';

export class CalificacionService {
  private static readonly STORAGE_KEY = 'evaluacionesGuardadas';
  private static readonly LAST_EVALUATION_KEY = 'ultimaEvaluacion';

  // Obtener todas las evaluaciones guardadas
  static getEvaluaciones(): EvaluacionGuardada[] {
    try {
      const evaluacionesGuardadas = localStorage.getItem(this.STORAGE_KEY);
      if (evaluacionesGuardadas) {
        return JSON.parse(evaluacionesGuardadas) as EvaluacionGuardada[];
      }
      return [];
    } catch (error) {
      console.error('Error al obtener evaluaciones:', error);
      return [];
    }
  }

  // Guardar evaluaciones
  static saveEvaluaciones(evaluaciones: EvaluacionGuardada[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(evaluaciones));
    } catch (error) {
      console.error('Error al guardar evaluaciones:', error);
    }
  }

  // Agregar nueva evaluación
  static addEvaluacion(evaluacion: Omit<EvaluacionGuardada, 'id'>): EvaluacionGuardada {
    const nuevaEvaluacion: EvaluacionGuardada = {
      ...evaluacion,
      id: Date.now().toString()
    };

    const evaluaciones = this.getEvaluaciones();
    const evaluacionesActualizadas = [...evaluaciones, nuevaEvaluacion];
    this.saveEvaluaciones(evaluacionesActualizadas);

    // Limpiar última evaluación
    this.clearLastEvaluation();

    return nuevaEvaluacion;
  }

  // Obtener última evaluación
  static getLastEvaluation(): Omit<EvaluacionGuardada, 'id'> | null {
    try {
      const ultimaEvaluacion = localStorage.getItem(this.LAST_EVALUATION_KEY);
      if (ultimaEvaluacion) {
        return JSON.parse(ultimaEvaluacion);
      }
      return null;
    } catch (error) {
      console.error('Error al obtener última evaluación:', error);
      return null;
    }
  }

  // Limpiar última evaluación
  static clearLastEvaluation(): void {
    localStorage.removeItem(this.LAST_EVALUATION_KEY);
  }

  // Verificar si hay nueva evaluación pendiente
  static hasPendingEvaluation(): boolean {
    return localStorage.getItem(this.LAST_EVALUATION_KEY) !== null;
  }

  // Procesar evaluación pendiente
  static processPendingEvaluation(): EvaluacionGuardada | null {
    const ultimaEvaluacion = this.getLastEvaluation();
    if (ultimaEvaluacion) {
      return this.addEvaluacion(ultimaEvaluacion);
    }
    return null;
  }

  // Filtrar evaluaciones por término de búsqueda
  static filterBySearch(evaluaciones: EvaluacionGuardada[], searchTerm: string): EvaluacionGuardada[] {
    if (!searchTerm) return evaluaciones;
    
    return evaluaciones.filter(
      (evaluacion) =>
        evaluacion.estudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evaluacion.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evaluacion.notaFinal.includes(searchTerm)
    );
  }

  // Filtrar evaluaciones por nota
  static filterByNota(evaluaciones: EvaluacionGuardada[], filterNota: string): EvaluacionGuardada[] {
    if (filterNota === 'todos') return evaluaciones;
    
    if (filterNota === 'aprobado') {
      return evaluaciones.filter((evaluacion) => {
        const nota = parseFloat(evaluacion.notaFinal || '0');
        return nota >= 70;
      });
    } else if (filterNota === 'reprobado') {
      return evaluaciones.filter((evaluacion) => {
        const nota = parseFloat(evaluacion.notaFinal || '0');
        return nota < 70;
      });
    }
    
    return evaluaciones;
  }

  // Calcular estadísticas
  static calculateStats(evaluaciones: EvaluacionGuardada[]) {
    return {
      total: evaluaciones.length,
      aprobados: evaluaciones.filter(e => parseFloat(e.notaFinal || '0') >= 70).length,
      reprobados: evaluaciones.filter(e => parseFloat(e.notaFinal || '0') < 70).length,
      promedioGeneral: evaluaciones.length > 0 
        ? (evaluaciones.reduce((acc, e) => acc + parseFloat(e.notaFinal || '0'), 0) / evaluaciones.length).toFixed(1)
        : '0'
    };
  }
}
