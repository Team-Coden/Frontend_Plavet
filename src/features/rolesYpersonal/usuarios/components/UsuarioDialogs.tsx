"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../shared/components/ui/dialog";
import { Button } from "../../../../shared/components/ui/button";
import { Badge } from "../../../../shared/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../shared/components/ui/select";
import { Label } from "../../../../shared/components/ui/label";
import type { Usuario, RolId } from "../types";
import { ROLES, ROL_IDS } from "../types";

// ─────────────────────────────────────────────
// View Dialog
// ─────────────────────────────────────────────
interface ViewUsuarioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  usuario: Usuario | null;
}

export const ViewUsuarioDialog = ({
  open,
  onOpenChange,
  usuario,
}: ViewUsuarioDialogProps) => {
  if (!usuario) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Detalles del Usuario</DialogTitle>
          <DialogDescription>
            Información completa del usuario seleccionado
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">ID</label>
              <p className="text-base font-mono">#{usuario.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Estado</label>
              <div className="mt-1">
                {usuario.estado === "Activo" ? (
                  <Badge variant="success">Activo</Badge>
                ) : (
                  <Badge variant="grey">Inactivo</Badge>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Nombre</label>
            <p className="text-base font-semibold">{usuario.nombre}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-base">{usuario.email}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Rol</label>
            <p className="text-base">
              {usuario.rol}{" "}
              <span className="text-xs text-muted-foreground">(ID: {usuario.id_rol})</span>
            </p>
          </div>

          {usuario.perfil_extendido && (
            <div className="rounded-lg border p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">Perfil extendido</p>
              {Object.entries(usuario.perfil_extendido).map(([key, val]) =>
                val !== undefined ? (
                  <div key={key} className="grid grid-cols-2 text-sm">
                    <span className="text-muted-foreground capitalize">{key}</span>
                    <span>{String(val)}</span>
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ─────────────────────────────────────────────
// Change Rol Dialog
// ─────────────────────────────────────────────
interface ChangeRolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  usuario: Usuario | null;
  onConfirm: (id: number, id_rol: RolId) => void;
}

export const ChangeRolDialog = ({
  open,
  onOpenChange,
  usuario,
  onConfirm,
}: ChangeRolDialogProps) => {
  const [selectedRol, setSelectedRol] = useState<RolId | null>(null);

  React.useEffect(() => {
    if (usuario) setSelectedRol(usuario.id_rol);
  }, [usuario]);

  if (!usuario) return null;

  const handleConfirm = () => {
    if (selectedRol !== null) {
      onConfirm(usuario.id, selectedRol);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Cambiar Rol</DialogTitle>
          <DialogDescription>
            Asigna un nuevo rol a <strong>{usuario.nombre}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <Label htmlFor="rol-select">Nuevo Rol</Label>
          <Select
            value={String(selectedRol)}
            onValueChange={(v) => setSelectedRol(Number(v) as RolId)}
          >
            <SelectTrigger id="rol-select">
              <SelectValue placeholder="Selecciona un rol" />
            </SelectTrigger>
            <SelectContent>
              {ROL_IDS.map((id) => (
                <SelectItem key={id} value={String(id)}>
                  {ROLES[id]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={selectedRol === usuario.id_rol}>
            Guardar Cambio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ─────────────────────────────────────────────
// Change Estado Dialog
// ─────────────────────────────────────────────
interface ChangeEstadoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  usuario: Usuario | null;
  onConfirm: (id: number, estado: "Activo" | "Inactivo") => void;
}

export const ChangeEstadoDialog = ({
  open,
  onOpenChange,
  usuario,
  onConfirm,
}: ChangeEstadoDialogProps) => {
  if (!usuario) return null;

  const nuevoEstado = usuario.estado === "Activo" ? "Inactivo" : "Activo";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Cambiar Estado</DialogTitle>
          <DialogDescription>
            {nuevoEstado === "Inactivo"
              ? `¿Deseas desactivar a ${usuario.nombre}? No podrá acceder al sistema.`
              : `¿Deseas activar a ${usuario.nombre}? Recuperará el acceso al sistema.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant={nuevoEstado === "Inactivo" ? "destructive" : "default"}
            onClick={() => {
              onConfirm(usuario.id, nuevoEstado);
              onOpenChange(false);
            }}
          >
            {nuevoEstado === "Inactivo" ? "Desactivar" : "Activar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
