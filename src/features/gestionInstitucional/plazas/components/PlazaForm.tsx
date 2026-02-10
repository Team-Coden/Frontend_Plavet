"use client";

import { Input } from "../../../../shared/components/ui/input";
import { Label } from "../../../../shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../shared/components/ui/select";
import { Briefcase } from "lucide-react";
import type { Plaza, Genero, EstadoPlaza } from "../types";
import { TALLERES } from "../types";

interface PlazaFormProps {
  formData: Partial<Plaza>;
  onChange: (data: Partial<Plaza>) => void;
  isEditing?: boolean;
}

export const PlazaForm = ({
  formData,
  onChange,
  isEditing = false,
}: PlazaFormProps) => {
  return (
    <div className="space-y-4 py-4">
      {/* Centro de Trabajo */}
      <div className="space-y-2">
        <Label>Centro de Trabajo</Label>
        <Select
          value={formData.centro}
          onValueChange={(v) => onChange({ ...formData, centro: v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un centro" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Centro Norte">Centro Norte</SelectItem>
            <SelectItem value="Taller Central">Taller Central</SelectItem>
            <SelectItem value="Planta 1">Planta 1</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Taller (NUEVO) */}
      <div className="space-y-2">
        <Label>Taller / Plaza</Label>
        <Select
          value={formData.taller}
          onValueChange={(v) =>
            onChange({ ...formData, taller: v as Plaza["taller"] })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un taller" />
          </SelectTrigger>
          <SelectContent>
            {TALLERES.map((taller) => (
              <SelectItem key={taller} value={taller}>
                {taller}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Nombre de Plaza */}
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre de Plaza</Label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="nombre"
            className="pl-10"
            value={formData.nombre || ""}
            onChange={(e) => onChange({ ...formData, nombre: e.target.value })}
            placeholder="Ej: Desarrollador Senior"
          />
        </div>
      </div>

      {/* Genero y Descripcion */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Genero</Label>
          <Select
            value={formData.genero}
            onValueChange={(v) =>
              onChange({ ...formData, genero: v as Genero })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Indistinto">Indistinto</SelectItem>
              <SelectItem value="Masculino">Masculino</SelectItem>
              <SelectItem value="Femenino">Femenino</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Descripcion (opcional)</Label>
          <Input
            placeholder="Describe las caracteristicas"
            value={formData.descripcion || ""}
            onChange={(e) =>
              onChange({ ...formData, descripcion: e.target.value })
            }
          />
        </div>
      </div>

      {/* Estado (Solo en edicion) */}
      {isEditing && (
        <div className="space-y-2">
          <Label>Estado</Label>
          <Select
            value={formData.estado}
            onValueChange={(v) =>
              onChange({ ...formData, estado: v as EstadoPlaza })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Activa">Activa</SelectItem>
              <SelectItem value="Ocupada">Ocupada</SelectItem>
              <SelectItem value="Inhabilitada">Inhabilitada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
