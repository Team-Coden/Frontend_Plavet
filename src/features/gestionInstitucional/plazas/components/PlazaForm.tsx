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
import { Briefcase, Search } from "lucide-react";
import type { Plaza, Genero, EstadoPlaza } from "../types";
import { TALLERES } from "../types";
import { useState } from "react";

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
  const [tallerSearch, setTallerSearch] = useState("");

  const filteredTalleres = TALLERES.filter((taller) =>
    taller.toLowerCase().includes(tallerSearch.toLowerCase())
  );

  return (
    <div className="space-y-4 py-4">
      {/* Centro de Trabajo - Ahora es buscador */}
      <div className="space-y-2">
        <Label htmlFor="centro">Centro de Trabajo</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="centro"
            className="pl-10"
            value={formData.centro || ""}
            onChange={(e) => onChange({ ...formData, centro: e.target.value })}
            placeholder="Buscar centro de trabajo..."
          />
        </div>
      </div>

      {/* Taller - Ahora es buscador con selección */}
      <div className="space-y-2">
        <Label htmlFor="taller">Taller</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="taller"
            className="pl-10"
            value={tallerSearch}
            onChange={(e) => setTallerSearch(e.target.value)}
            placeholder="Buscar taller por nombre..."
          />
        </div>
        {tallerSearch && (
          <div className="border rounded-md max-h-32 overflow-y-auto">
            {filteredTalleres.length > 0 ? (
              filteredTalleres.map((taller) => (
                <div
                  key={taller}
                  className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
                  onClick={() => {
                    onChange({ ...formData, taller });
                    setTallerSearch(taller);
                  }}
                >
                  {taller}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                No se encontraron talleres
              </div>
            )}
          </div>
        )}
        {formData.taller && !tallerSearch && (
          <div className="text-sm text-muted-foreground">
            Seleccionado: <span className="font-medium">{formData.taller}</span>
          </div>
        )}
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
      <div className="grid grid-cols-1 gap-4">
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
          <Label htmlFor="descripcion">Descripción (opcional)</Label>
          <textarea
            id="descripcion"
            className="w-full min-h-[120px] p-3 border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            placeholder="Describe las características y responsabilidades de la plaza..."
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
