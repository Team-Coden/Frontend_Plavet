import React from 'react';
import type { EvaluacionGuardada } from '../types';
import { EVALUATION_CATEGORIES } from '../utils';

interface CalificacionTableRowsProps {
  evaluacion: EvaluacionGuardada;
}

// Componente para renderizar celdas de datos numéricos
const NumericCells: React.FC<{ values: string[] | undefined }> = React.memo(({ values }) => {
  return (
    <>
      {Array.isArray(values) 
        ? values.map((valor, index) => (
            <td key={index} className="border border-border px-2 py-2 text-center bg-background hover:bg-muted/50 transition-colors">
              {valor || '-'}
            </td>
          ))
        : Array(12).fill(null).map((_, index) => (
            <td key={index} className="border border-border px-2 py-2 text-center bg-background hover:bg-muted/50 transition-colors">
              -
            </td>
          ))
      }
    </>
  );
});

NumericCells.displayName = 'NumericCells';

// Componente para renderizar filas de capacidades
const CapacidadesRows: React.FC<{ evaluacion: EvaluacionGuardada }> = React.memo(({ evaluacion }) => {
  return (
    <>
      {EVALUATION_CATEGORIES.capacidades.map((capacidad) => (
        <tr key={capacidad.key}>
          <td className="border border-border px-4 py-2 font-medium text-blue-600">
            {capacidad.label}
          </td>
          <NumericCells values={evaluacion.evaluacionCompleta[capacidad.key] as string[]} />
        </tr>
      ))}
    </>
  );
});

CapacidadesRows.displayName = 'CapacidadesRows';

// Componente para renderizar filas de habilidades
const HabilidadesRows: React.FC<{ evaluacion: EvaluacionGuardada }> = React.memo(({ evaluacion }) => {
  return (
    <>
      {EVALUATION_CATEGORIES.habilidades.map((habilidad) => (
        <tr key={habilidad.key}>
          <td className="border border-border px-4 py-2 font-medium text-purple-600">
            {habilidad.label}
          </td>
          <NumericCells values={evaluacion.evaluacionCompleta[habilidad.key] as string[]} />
        </tr>
      ))}
    </>
  );
});

HabilidadesRows.displayName = 'HabilidadesRows';

// Componente para renderizar filas de actitudes
const ActitudesRows: React.FC<{ evaluacion: EvaluacionGuardada }> = React.memo(({ evaluacion }) => {
  return (
    <>
      {EVALUATION_CATEGORIES.actitudes.map((actitud) => (
        <tr key={actitud.key}>
          <td className="border border-border px-4 py-2 font-medium text-green-600">
            {actitud.label}
          </td>
          <td colSpan={12} className="border border-border px-4 py-2 text-center bg-background hover:bg-muted/50 transition-colors">
            {evaluacion.evaluacionCompleta[actitud.key] || 'No evaluado'}
          </td>
        </tr>
      ))}
    </>
  );
});

ActitudesRows.displayName = 'ActitudesRows';

// Componente principal que une todas las filas
export const CalificacionTableRows: React.FC<CalificacionTableRowsProps> = React.memo(({ evaluacion }) => {
  return (
    <>
      <CapacidadesRows evaluacion={evaluacion} />
      <HabilidadesRows evaluacion={evaluacion} />
      <ActitudesRows evaluacion={evaluacion} />
    </>
  );
});

CalificacionTableRows.displayName = 'CalificacionTableRows';
