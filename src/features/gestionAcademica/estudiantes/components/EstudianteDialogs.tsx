"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../shared/components/ui/dialog";
import { Button } from "../../../../shared/components/ui/button";
import { Input } from "../../../../shared/components/ui/input";
import { Label } from "../../../../shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../shared/components/ui/select";
import type { Estudiante, CreateEstudianteData, Genero, EstadoEstudiante } from "../types";
import { apiClient } from "../../../../lib/api";

interface TallerOption {
  id: number;
  nombre: string;
}

const useTalleres = () => {
  const [talleres, setTalleres] = useState<TallerOption[]>([]);

  useEffect(() => {
    apiClient.get<any>("/api/talleres", { pageSize: 100 })
      .then(res => setTalleres(res.data || []))
      .catch(() => {});
  }, []);

  return talleres;
};

interface CreateEstudianteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateEstudianteData) => void;
}

export const CreateEstudianteDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: CreateEstudianteDialogProps) => {
  const talleres = useTalleres();

  const emptyForm: CreateEstudianteData = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    genero: "Masculino",
    direccion: "",
    cedula: "",
    fecha_nacimiento: "",
    id_taller: undefined,
  };

  const [formData, setFormData] = useState<CreateEstudianteData>(emptyForm);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData(emptyForm);
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nuevo Estudiante</DialogTitle>
          <DialogDescription>
            Crea un nuevo registro de estudiante en el sistema.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                value={formData.apellido}
                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cedula">Cédula</Label>
              <Input
                id="cedula"
                value={formData.cedula}
                onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
              <Input
                id="fecha_nacimiento"
                type="date"
                value={formData.fecha_nacimiento}
                onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="genero">Género</Label>
              <Select
                value={formData.genero}
                onValueChange={(value) => setFormData({ ...formData, genero: value as Genero })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Femenino">Femenino</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="id_taller">Taller</Label>
              <Select
                value={formData.id_taller?.toString() || ""}
                onValueChange={(value) => setFormData({ ...formData, id_taller: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar taller" />
                </SelectTrigger>
                <SelectContent>
                  {talleres.map((t) => (
                    <SelectItem key={t.id} value={t.id.toString()}>
                      {t.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creando..." : "Crear Estudiante"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface EditEstudianteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  estudiante: Estudiante | null;
  onSubmit: (data: Estudiante) => void;
}

export const EditEstudianteDialog = ({
  open,
  onOpenChange,
  estudiante,
  onSubmit,
}: EditEstudianteDialogProps) => {
  const talleres = useTalleres();
  const [formData, setFormData] = useState<Estudiante | null>(estudiante);

  React.useEffect(() => {
    setFormData(estudiante);
  }, [estudiante]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSubmit(formData);
      onOpenChange(false);
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Estudiante</DialogTitle>
          <DialogDescription>
            Modifica la información del estudiante seleccionado.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-nombre">Nombre</Label>
              <Input
                id="edit-nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-apellido">Apellido</Label>
              <Input
                id="edit-apellido"
                value={formData.apellido}
                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-cedula">Cédula</Label>
              <Input
                id="edit-cedula"
                value={formData.cedula}
                onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-telefono">Teléfono</Label>
              <Input
                id="edit-telefono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-direccion">Dirección</Label>
              <Input
                id="edit-direccion"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-genero">Género</Label>
              <Select
                value={formData.genero}
                onValueChange={(value) => setFormData({ ...formData, genero: value as Genero })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Masculino">Masculino</SelectItem>
                  <SelectItem value="Femenino">Femenino</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="edit-taller">Taller</Label>
              <Select
                value={formData.carrera as string}
                onValueChange={(value) => {
                  const taller = talleres.find(t => t.id.toString() === value);
                  setFormData({ ...formData, carrera: taller?.nombre || value });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar taller" />
                </SelectTrigger>
                <SelectContent>
                  {talleres.map((t) => (
                    <SelectItem key={t.id} value={t.id.toString()}>
                      {t.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="edit-estado">Estado</Label>
            <Select
              value={formData.estado}
              onValueChange={(value) => setFormData({ ...formData, estado: value as EstadoEstudiante })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
                <SelectItem value="Suspendido">Suspendido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface ViewEstudianteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  estudiante: Estudiante | null;
  getEstadoBadge: (estado: string) => React.ReactNode;
}

export const ViewEstudianteDialog = ({
  open,
  onOpenChange,
  estudiante,
  getEstadoBadge,
}: ViewEstudianteDialogProps) => {
  if (!estudiante) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalles del Estudiante</DialogTitle>
          <DialogDescription>
            Información completa del estudiante seleccionado
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Nombre</label>
              <p className="text-base font-semibold">{estudiante.nombre}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Apellido</label>
              <p className="text-base font-semibold">{estudiante.apellido}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Cédula</label>
              <p className="text-base">{estudiante.cedula}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-base">{estudiante.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Teléfono</label>
              <p className="text-base">{estudiante.telefono}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Dirección</label>
              <p className="text-base">{estudiante.direccion}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Taller</label>
              <p className="text-base">{estudiante.carrera}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Género</label>
              <p className="text-base">{estudiante.genero}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Estado</label>
              <div className="mt-1">{getEstadoBadge(estudiante.estado)}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Fecha de Ingreso</label>
              <p className="text-base">{estudiante.fechaIngreso}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface DeleteEstudianteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  estudianteNombre?: string;
  isInactivo?: boolean;
}

export const DeleteEstudianteDialog = ({
  open,
  onOpenChange,
  onConfirm,
  estudianteNombre,
  isInactivo = false,
}: DeleteEstudianteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isInactivo ? "Eliminar Permanentemente" : "Cambiar Estado"}
          </DialogTitle>
          <DialogDescription>
            {isInactivo
              ? `¿Estás seguro de eliminar permanentemente a ${estudianteNombre}? Esta acción no se puede deshacer.`
              : `¿Estás seguro de cambiar el estado de ${estudianteNombre} a Inactivo? Podrás restaurarlo más tarde.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {isInactivo ? "Eliminar Permanentemente" : "Cambiar Estado"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};