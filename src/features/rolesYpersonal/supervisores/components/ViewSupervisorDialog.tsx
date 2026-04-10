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
import type { Supervisor } from "../types";

interface ViewSupervisorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supervisor: Supervisor | null;
  onRestore?: (supervisor: Supervisor) => void;
  onEdit?: () => void;
}

export function ViewSupervisorDialog({
  open,
  onOpenChange,
  supervisor,
}: ViewSupervisorDialogProps) {
  if (!supervisor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalles del Supervisor</DialogTitle>
          <DialogDescription>
            Información completa del supervisor seleccionado
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Nombre</label>
              <p className="text-base">{supervisor.nombre}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Apellido</label>
              <p className="text-base">{supervisor.apellido}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-base">{supervisor.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Teléfono</label>
              <p className="text-base">{supervisor.telefono}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Centro de Trabajo</label>
              <p className="text-base">{supervisor.nombre_centro}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Estado</label>
              <div className="mt-1">
                <Badge
                  variant={
                    supervisor.estado === "activo" ? "default" : "secondary"
                  }
                >
                  {supervisor.estado === "activo" ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-500">Fecha de Contratación</label>
            <p className="text-base">{supervisor.fecha_contratacion}</p>
          </div>
          
          {supervisor.deletedAt && (
            <div>
              <label className="text-sm font-medium text-gray-500">Fecha de Eliminación</label>
              <p className="text-base text-red-600">{supervisor.deletedAt}</p>
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
