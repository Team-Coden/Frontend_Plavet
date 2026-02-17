"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardHeader, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/shared/components/ui/table";

// Importar hooks y componentes necesarios
import { useSupervisores } from "../hooks/useSupervisores";
import { SupervisorTableRow } from "../components/SupervisorTableRow";
import { SupervisorDialog } from "../components/SupervisorDialog";
import { DeleteConfirmDialog } from "@/features/gestionInstitucional/centroDeTrabajo/components/DeleteConfirmDialog";
import type { Supervisor, SupervisorFormData } from "../types";
import Main from "@/features/main/pages/page";

// Datos dummy para desarrollo
const initialData: Supervisor[] = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    id_contacto: 1,
    fecha_creacion: new Date().toISOString(),
    id_centro_trabajo: 1,
    estado: "activo",
    nombre_contacto: "Juan Pérez",
    nombre_centro: "Centro Principal"
  },
  {
    id: 2,
    nombre: "María",
    apellido: "González",
    id_contacto: 2,
    fecha_creacion: new Date().toISOString(),
    id_centro_trabajo: 2,
    estado: "activo",
    nombre_contacto: "María González",
    nombre_centro: "Centro Secundario"
  },
  {
    id: 3,
    nombre: "Carlos",
    apellido: "López",
    id_contacto: 3,
    fecha_creacion: new Date().toISOString(),
    id_centro_trabajo: null,
    estado: "inactivo",
    nombre_contacto: "Carlos López",
    nombre_centro: "Sin asignar"
  },
];

export default function SupervisoresPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState<Supervisor | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  
  // Usar el hook de supervisores
  const { supervisores, loading, error, createSupervisor, updateSupervisor, deleteSupervisor } = 
    useSupervisores(initialData);

  // Filtrar supervisores
  const filteredSupervisores = supervisores.filter(supervisor => {
    const matchesSearch = `${supervisor.nombre} ${supervisor.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supervisor.nombre_centro?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "todos" || supervisor.estado === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Manejadores de eventos
  const handleCreate = () => {
    setSelectedSupervisor(null);
    setIsEditing(false);
    setIsViewing(false);
    setIsDialogOpen(true);
  };

  const handleEdit = (supervisor: Supervisor) => {
    setSelectedSupervisor(supervisor);
    setIsEditing(true);
    setIsViewing(false);
    setIsDialogOpen(true);
  };

  const handleView = (supervisor: Supervisor) => {
    setSelectedSupervisor(supervisor);
    setIsViewing(true);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (supervisor: Supervisor) => {
    setSelectedSupervisor(supervisor);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedSupervisor) {
      await deleteSupervisor(selectedSupervisor.id);
      setIsDeleteDialogOpen(false);
      setSelectedSupervisor(null);
    }
  };

  const handleSubmit = async (data: SupervisorFormData) => {
    if (isEditing && selectedSupervisor) {
      await updateSupervisor(selectedSupervisor.id, data);
    } else {
      await createSupervisor(data);
    }
    setIsDialogOpen(false);
  };

  return (
    <Main>
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestión de Supervisores</h1>
          <p className="text-muted-foreground">
            Administra los supervisores de los centros de trabajo
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Supervisor
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar supervisores..."
                  className="w-full pl-8 md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="activo">Activos</SelectItem>
                  <SelectItem value="inactivo">Inactivos</SelectItem>
                  <SelectItem value="pendiente">Pendientes</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Centro de Trabajo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha de Creación</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <td colSpan={6} className="text-center py-4">
                      Cargando supervisores...
                    </td>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <td colSpan={6} className="text-center text-destructive py-4">
                      Error al cargar los supervisores: {error}
                    </td>
                  </TableRow>
                ) : filteredSupervisores.length === 0 ? (
                  <TableRow>
                    <td colSpan={6} className="text-center py-4 text-muted-foreground">
                      No se encontraron supervisores
                    </td>
                  </TableRow>
                ) : (
                  filteredSupervisores.map((supervisor) => (
                    <SupervisorTableRow
                      key={supervisor.id}
                      supervisor={supervisor}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Diálogos */}
      <SupervisorDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        supervisor={selectedSupervisor}
        onSubmit={handleSubmit}
        isEditing={isEditing}
        isViewing={isViewing}
      />

     <DeleteConfirmDialog
  open={isDeleteDialogOpen}
  onOpenChange={setIsDeleteDialogOpen}
  onConfirm={handleDeleteConfirm}
  centroNombre={`${selectedSupervisor?.nombre} ${selectedSupervisor?.apellido}`}
  isPermanent={true}  // or false, depending on your needs
/>
    </div>
    </Main>
  );
}
