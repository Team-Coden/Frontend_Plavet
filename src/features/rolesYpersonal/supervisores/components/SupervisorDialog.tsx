import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import type { Supervisor, SupervisorFormData } from "../types";

// Esquema de validación
const supervisorFormSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  apellido: z.string().min(2, {
    message: "El apellido debe tener al menos 2 caracteres.",
  }),
  id_contacto: z.string().min(1, {
    message: "Debe seleccionar un contacto.",
  }),
  id_centro_trabajo: z.string().nullable().optional(),
  estado: z.enum(["activo", "inactivo", "pendiente"]).refine(
    (val) => val !== undefined && val !== null,
    {
      message: "Debe seleccionar un estado.",
    }
  ),
});

type SupervisorFormValues = z.infer<typeof supervisorFormSchema>;

interface SupervisorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supervisor?: Supervisor | null;
  onSubmit: (data: SupervisorFormData) => Promise<void>;
  isEditing?: boolean;
  isViewing?: boolean;
}

export function SupervisorDialog({
  open,
  onOpenChange,
  supervisor,
  onSubmit,
  isEditing = false,
  isViewing = false,
}: SupervisorDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Datos de ejemplo para los selects
  const contactos = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com' },
    { id: 2, nombre: 'María González', email: 'maria@example.com' },
    { id: 3, nombre: 'Carlos López', email: 'carlos@example.com' },
  ];

  const centrosTrabajo = [
    { id: 1, nombre: 'Centro Principal' },
    { id: 2, nombre: 'Centro Secundario' },
    { id: 3, nombre: 'Sucursal Norte' },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultValues: SupervisorFormValues = {
    nombre: "",
    apellido: "",
    id_contacto: "",
    id_centro_trabajo: null,
    estado: "activo" as const,
  };

  const form = useForm<SupervisorFormValues>({
    resolver: zodResolver(supervisorFormSchema),
    defaultValues,
  });

  // Reset form when supervisor changes
  useEffect(() => {
    if (supervisor) {
      form.reset({
        nombre: supervisor.nombre,
        apellido: supervisor.apellido,
        id_contacto: String(supervisor.id_contacto),
        id_centro_trabajo: supervisor.id_centro_trabajo ? String(supervisor.id_centro_trabajo) : null,
        estado: supervisor.estado,
      } as SupervisorFormValues);
    } else {
      form.reset(defaultValues);
    }
  }, [supervisor, form, defaultValues]);

  const handleSubmit: SubmitHandler<SupervisorFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      // Convert id_contacto to number before submitting
      const formData: SupervisorFormData = {
        ...data,
        id_contacto: data.id_contacto,
        id_centro_trabajo: data.id_centro_trabajo || null,
      };
      
      await onSubmit(formData);
      onOpenChange(false);
      
      toast.success(
        isEditing 
          ? "Los datos del supervisor se han actualizado correctamente."
          : "El supervisor ha sido creado exitosamente.",
        {
          position: 'top-right',
          duration: 5000,
        }
      );
    } catch (error) {
      console.error("Error al guardar el supervisor:", error);
      toast.error("Ocurrió un error al guardar los datos del supervisor.", {
        position: 'top-right',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = isViewing 
    ? "Detalles del Supervisor" 
    : isEditing 
      ? "Editar Supervisor" 
      : "Nuevo Supervisor";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {isViewing 
              ? "Información detallada del supervisor."
              : isEditing 
                ? "Actualiza los datos del supervisor."
                : "Completa el formulario para registrar un nuevo supervisor."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre */}
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nombre" 
                        {...field} 
                        disabled={isViewing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Apellido */}
              <FormField
                control={form.control}
                name="apellido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Apellido" 
                        {...field} 
                        disabled={isViewing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contacto */}
              <FormField
                control={form.control}
                name="id_contacto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contacto *</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || ""}
                      disabled={isViewing}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un contacto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {contactos.map((contacto) => (
                          <SelectItem key={contacto.id} value={String(contacto.id)}>
                            {contacto.nombre} ({contacto.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Centro de Trabajo */}
              <FormField
                control={form.control}
                name="id_centro_trabajo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Centro de Trabajo</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || ""}
                      disabled={isViewing}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un centro" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Sin asignar</SelectItem>
                        {centrosTrabajo.map((centro) => (
                          <SelectItem key={centro.id} value={String(centro.id)}>
                            {centro.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Estado */}
              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado *</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={isViewing}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="activo">Activo</SelectItem>
                        <SelectItem value="inactivo">Inactivo</SelectItem>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Fecha de creación (solo lectura) */}
            {supervisor?.fecha_creacion && (
              <div className="text-sm text-muted-foreground">
                <p>Fecha de creación: {format(new Date(supervisor.fecha_creacion), 'PPP', { locale: es })}</p>
              </div>
            )}

            {!isViewing && (
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting 
                    ? "Guardando..." 
                    : isEditing 
                      ? "Actualizar" 
                      : "Guardar"}
                </Button>
              </DialogFooter>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
