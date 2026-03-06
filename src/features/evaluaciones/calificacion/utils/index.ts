// Evaluation categories configuration
export const EVALUATION_CATEGORIES = {
  capacidades: [
    { key: 'conocimientosTeoricos', label: 'Conocimientos Teóricos' },
    { key: 'seguimientoInstrucciones', label: 'Seguimiento de Instrucciones' },
    { key: 'organizacion', label: 'Organización' },
    { key: 'metodo', label: 'Método de Trabajo' },
    { key: 'ritmoTrabajo', label: 'Ritmo de Trabajo' },
  ],
  habilidades: [
    { key: 'iniciativa', label: 'Iniciativa' },
    { key: 'trabajoEquipo', label: 'Trabajo en Equipo' },
    { key: 'puntualidadAsistencia', label: 'Puntualidad y Asistencia' },
    { key: 'responsabilidad', label: 'Responsabilidad' },
  ],
  actitudes: [
    { key: 'relacionesInterpersonales', label: 'Relaciones Interpersonales' },
    { key: 'adaptacionAmbiente', label: 'Adaptación al Ambiente' },
    { key: 'presentacionPersonal', label: 'Presentación Personal' },
  ],
} as const;

// Badge configuration for grades - returns configuration object
export const getNotaBadgeConfig = (notaFinal: string) => {
  const nota = parseFloat(notaFinal || '0');
  if (nota >= 90) {
    return {
      className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200",
      label: "Excelente"
    };
  } else if (nota >= 80) {
    return {
      className: "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200",
      label: "Muy Bueno"
    };
  } else if (nota >= 70) {
    return {
      className: "bg-green-100 text-green-700 hover:bg-green-100 border-green-200",
      label: "Aprobado"
    };
  } else {
    return {
      className: "bg-red-100 text-red-700 hover:bg-red-100 border-red-200",
      label: "Reprobado"
    };
  }
};

// Format evaluation ID
export const formatEvaluationId = (id: string) => `#${id.slice(-6)}`;

// Calculate final grade from averages
export const calculateNotaFinal = (
  promedioCapacidades: number,
  promedioHabilidades: number,
  promedioActitudes: number
): string => {
  const notaFinal = (promedioCapacidades + promedioHabilidades + promedioActitudes) / 3;
  return notaFinal.toFixed(1);
};

// Check if all categories are approved (>= 70)
export const isAllApproved = (
  promedioCapacidades: string,
  promedioHabilidades: string,
  promedioActitudes: string
): boolean => {
  const capacidades = parseFloat(promedioCapacidades || '0');
  const habilidades = parseFloat(promedioHabilidades || '0');
  const actitudes = parseFloat(promedioActitudes || '0');
  
  return capacidades >= 70 && habilidades >= 70 && actitudes >= 70;
};

// Check if the final grade is approved (>= 70)
export const isApproved = (notaFinal: string): boolean => {
  const nota = parseFloat(notaFinal || '0');
  return nota >= 70;
};

// Get color class based on grade
export const getGradeColorClass = (grade: string): string => {
  const nota = parseFloat(grade || '0');
  if (nota >= 90) return 'text-emerald-600 font-semibold';
  if (nota >= 80) return 'text-blue-600 font-semibold';
  if (nota >= 70) return 'text-green-600 font-semibold';
  return 'text-red-600 font-semibold';
};
