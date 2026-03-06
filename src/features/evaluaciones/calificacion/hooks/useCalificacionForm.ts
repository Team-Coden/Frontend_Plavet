import { useState, useCallback, useMemo } from 'react';
import type { EvaluacionGuardada } from '../types';
import { calculateNotaFinal } from '../utils';

interface UseCalificacionFormProps {
  evaluacion: EvaluacionGuardada | null;
}

export const useCalificacionForm = ({ evaluacion }: UseCalificacionFormProps) => {
  const [localChanges, setLocalChanges] = useState<Partial<EvaluacionGuardada>>({});

  // Derive form data from evaluacion and local changes
  const formData = useMemo(() => {
    if (!evaluacion) return {} as Partial<EvaluacionGuardada>;
    
    return {
      ...evaluacion,
      ...localChanges,
    };
  }, [evaluacion, localChanges]);

  // Manejar cambios en los inputs con tipado correcto
  const handleInputChange = useCallback((field: keyof EvaluacionGuardada, value: string | number) => {
    setLocalChanges((prev: Partial<EvaluacionGuardada>) => {
      const updated = {
        ...prev,
        [field]: value
      };

      // Si es un campo de promedio, recalcular la nota final automáticamente
      if (field === 'promedioCapacidades' || field === 'promedioHabilidades' || field === 'promedioActitudes') {
        const capacidades = parseFloat(updated.promedioCapacidades || '0');
        const habilidades = parseFloat(updated.promedioHabilidades || '0');
        const actitudes = parseFloat(updated.promedioActitudes || '0');
        
        if (!isNaN(capacidades) && !isNaN(habilidades) && !isNaN(actitudes)) {
          updated.notaFinal = calculateNotaFinal(capacidades, habilidades, actitudes);
        }
      }

      return updated;
    });
  }, []);

  // Manejar cambios específicos para inputs numéricos
  const handleNumberInput = useCallback((field: keyof EvaluacionGuardada, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      handleInputChange(field, numValue);
    } else {
      handleInputChange(field, value);
    }
  }, [handleInputChange]);

  // Guardar la evaluación actualizada
  const handleSave = useCallback((onSave: (evaluacion: EvaluacionGuardada) => void) => {
    if (evaluacion && formData) {
      const updatedEvaluacion: EvaluacionGuardada = {
        ...evaluacion,
        ...formData,
      } as EvaluacionGuardada;
      onSave(updatedEvaluacion);
    }
  }, [evaluacion, formData]);

  return {
    formData,
    handleInputChange,
    handleNumberInput,
    handleSave,
  };
};
