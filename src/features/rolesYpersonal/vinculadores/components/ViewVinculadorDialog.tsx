import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../shared/components/ui/dialog";
import { Badge } from "../../../../shared/components/ui/badge";
import { Button } from "../../../../shared/components/ui/button";
import type { Vinculador } from "../types";

interface ViewVinculadorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vinculador: Vinculador | null;
}

export function ViewVinculadorDialog({
  open,
  onOpenChange,
  vinculador,
}: ViewVinculadorDialogProps) {
  if (!vinculador) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalles del Vinculador</DialogTitle>
          <DialogDescription>
            Información completa del vinculador seleccionado
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Nombre</label>
              <p className="text-base">{vinculador.nombre}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Apellido</label>
              <p className="text-base">{vinculador.apellido}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-base">{vinculador.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Teléfono</label>
              <p className="text-base">{vinculador.telefono}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Centro de Trabajo</label>
              <p className="text-base">{vinculador.nombre_centro}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Estado</label>
              <div className="mt-1">
                <Badge
                  variant={
                    vinculador.estado === "activo" ? "default" : "secondary"
                  }
                >
                  {vinculador.estado === "activo" ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500">Fecha de Creación</label>
            <p className="text-base">{vinculador.fecha_creacion}</p>
          </div>
          
          {vinculador.deletedAt && (
            <div>
              <label className="text-sm font-medium text-gray-500">Fecha de Eliminación</label>
              <p className="text-base text-red-600">{vinculador.deletedAt}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
