"use client";

import { useState } from "react";
import {
  Briefcase,
  Search,
  Filter,
  Download,
  Plus,
} from "lucide-react";
import { Button } from "../../../../shared/components/ui/button";
import { Card, CardHeader, CardContent } from "../../../../shared/components/ui/card";
import { Input } from "../../../../shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../shared/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "../../../../shared/components/ui/table";
import { Badge } from "../../../../shared/components/ui/badge";

import { usePlazas } from "../hooks/usePlazas";
import { StatsCards } from "../components/StatsCards";
import { PlazaTableRow } from "../components/PlazaTableRow";
import {
  CreatePlazaDialog,
  EditPlazaDialog,
  ViewPlazaDialog,
  DeletePlazaDialog, 
} from "../components/PlazaDialogs";
import type { Plaza } from "../types";
import Main from "@/features/main/pages/page";

// ==========================================
// Datos dummy para desarrollo
// ==========================================
const initialData: Plaza[] = [
  {
    id: 1,
    nombre: "Operador CNC",
    centro: "Centro Norte",
    titulo: "Operario",
    genero: "Indistinto",
    estado: "Activa",
    descripcion: "Operador de maquinas CNC para produccion",
    fechaCreacion: "2025-01-15",
    taller: "Informatica",
  },
  {
    id: 2,
    nombre: "Soldador TIG",
    centro: "Taller Central",
    titulo: "Operario",
    genero: "Masculino",
    estado: "Ocupada",
    descripcion: "Soldador especializado en TIG",
    fechaCreacion: "2025-02-20",
    taller: "Mecanizado",
  },
  {
    id: 3,
    nombre: "Electricista Industrial",
    centro: "Planta 1",
    titulo: "Supervisor",
    genero: "Indistinto",
    estado: "Inhabilitada",
    descripcion: "Mantenimiento electrico industrial",
    fechaCreacion: "2025-03-10",
    taller: "Electronica",
  },
  

];

export default function PlazasPage() {
  const {
    plazas,
    filteredPlazas,
    stats,
    searchTerm,
    setSearchTerm,
    filterEstado,
    setFilterEstado,
    addPlaza,
    updatePlaza,
    deletePlaza,
    centrosDisponibles,
    titulosDisponibles,
  } = usePlazas(initialData);

  // Estados locales para control de UI
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); 
  const [selectedPlaza, setSelectedPlaza] = useState<Plaza | null>(null);

  // Helper de Badge por estado
  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Activa":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
            Activa
          </Badge>
        );
      case "Ocupada":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">
            Ocupada
          </Badge>
        );
      case "Inhabilitada":
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200">
            Inhabilitada
          </Badge>
        );
      default:
        return <Badge variant="outline">{estado}</Badge>;
    }
  };

  // Handlers de acciones
  const handleView = (plaza: Plaza) => {
    setSelectedPlaza(plaza);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (plaza: Plaza) => {
    setSelectedPlaza(plaza);
    setIsEditDialogOpen(true);
  };

  const handleDeleteRequest = (plaza: Plaza) => {
    setSelectedPlaza(plaza);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPlaza) {
      deletePlaza(selectedPlaza.id);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <Main>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground text-balance">
                Plazas de Centros de Trabajo
              </h1>
            </div>
            <p className="text-muted-foreground ml-12">
              Gestiona las plazas disponibles en los centros de trabajo y talleres
            </p>
          </div>

          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Main Content */}
          <Card className="border">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent text-foreground"
                  >
                    <Download className="h-4 w-4" /> Exportar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsDialogOpen(true)}
                    className="gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" /> Nueva Plaza
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, centro, titulo o taller..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={filterEstado} onValueChange={setFilterEstado}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="Activa">Activa</SelectItem>
                    <SelectItem value="Ocupada">Ocupada</SelectItem>
                    <SelectItem value="Inhabilitada">Inhabilitada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Mostrando {filteredPlazas.length} de {plazas.length} plazas
              </p>

              {/* Table */}
              {filteredPlazas.length > 0 ? (
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold w-20">ID</TableHead>
                        <TableHead className="font-semibold">Nombre de Plaza</TableHead>
                        <TableHead className="font-semibold">Centro de Trabajo</TableHead>
                        <TableHead className="font-semibold">Titulo</TableHead>
                        <TableHead className="font-semibold">Genero</TableHead>
                        <TableHead className="font-semibold">Estado</TableHead>
                        <TableHead className="font-semibold">Fecha</TableHead>
                        <TableHead className="font-semibold text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPlazas.map((plaza) => (
                        <PlazaTableRow
                          key={plaza.id}
                          plaza={plaza}
                          onView={handleView}
                          onEdit={handleEdit}
                          onDelete={() => handleDeleteRequest(plaza)} 
                        />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="rounded-lg border py-16 text-center">
                  <div className="p-4 rounded-full bg-muted mb-4 inline-block">
                    <Search className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No hay plazas que coincidan
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Intenta ajustar los filtros o crea una nueva plaza
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* --- Dialogos y Modales --- */}
        
        {/* Nuevo Diálogo de Confirmación para Eliminar */}
        <DeletePlazaDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          plazaNombre={selectedPlaza?.nombre}
        />

        <CreatePlazaDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={addPlaza}
          centros={centrosDisponibles}
          titulos={titulosDisponibles}
        />

        <EditPlazaDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          plaza={selectedPlaza}
          onSubmit={updatePlaza}
          centros={centrosDisponibles}
          titulos={titulosDisponibles}
        />

        <ViewPlazaDialog
          open={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
          plaza={selectedPlaza}
          getEstadoBadge={getEstadoBadge}
        />
      </div>
    </Main>
  );
}