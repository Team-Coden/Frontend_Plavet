"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader } from "../../../shared/components/ui/card"
import { Button } from "../../../shared/components/ui/button"
import { Input } from "../../../shared/components/ui/input"
import { Label } from "../../../shared/components/ui/label"
import { Textarea } from "../../../shared/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../shared/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shared/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../shared/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../shared/components/ui/table"
import {
  Briefcase,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Users,
  Building2,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  UserPlus,
  GraduationCap,
  Filter,
} from "lucide-react"

import { Suspense } from "react"
import Loading from "./loading"
import Main from "@/features/main/pages/page"

interface Pasantia {
  id: string
  estudiante: string
  matricula: string
  taller: string
  centroTrabajo: string
  tutor: string
  fechaInicio: string
  fechaFin: string
  horasCompletadas: number
  horasRequeridas: number
  estado: "activa" | "completada" | "suspendida" | "pendiente"
  observaciones: string
}

const pasantiasIniciales: Pasantia[] = [
  {
    id: "PAS-001",
    estudiante: "Juan Perez",
    matricula: "12345678",
    taller: "Taller de Software",
    centroTrabajo: "TechCorp Solutions",
    tutor: "Ing. Maria Garcia",
    fechaInicio: "2025-01-15",
    fechaFin: "2025-06-15",
    horasCompletadas: 120,
    horasRequeridas: 480,
    estado: "activa",
    observaciones: "Buen desempeno en el area de desarrollo"
  },
  {
    id: "PAS-002",
    estudiante: "Ana Martinez",
    matricula: "12345679",
    taller: "Gestion",
    centroTrabajo: "Consultores RD",
    tutor: "Lic. Carlos Mendez",
    fechaInicio: "2025-01-10",
    fechaFin: "2025-06-10",
    horasCompletadas: 480,
    horasRequeridas: 480,
    estado: "completada",
    observaciones: "Pasantia finalizada exitosamente"
  },
  {
    id: "PAS-003",
    estudiante: "Carlos Rodriguez",
    matricula: "12345680",
    taller: "Automotriz",
    centroTrabajo: "AutoService Center",
    tutor: "Tec. Roberto Diaz",
    fechaInicio: "2025-02-01",
    fechaFin: "2025-07-01",
    horasCompletadas: 0,
    horasRequeridas: 480,
    estado: "pendiente",
    observaciones: "Pendiente de iniciar"
  },
  {
    id: "PAS-004",
    estudiante: "Maria Sanchez",
    matricula: "12345681",
    taller: "Taller de Software",
    centroTrabajo: "DataSoft Inc",
    tutor: "Ing. Pedro Almonte",
    fechaInicio: "2024-09-01",
    fechaFin: "2025-02-01",
    horasCompletadas: 200,
    horasRequeridas: 480,
    estado: "suspendida",
    observaciones: "Suspendida por razones personales"
  },
]

const talleres = ["Todos", "Taller de Software", "Gestion", "Automotriz", "Electricidad"]
const centros = ["TechCorp Solutions", "Consultores RD", "AutoService Center", "DataSoft Inc", "ElectroTec"]
const tutores = ["Ing. Maria Garcia", "Lic. Carlos Mendez", "Tec. Roberto Diaz", "Ing. Pedro Almonte"]
const estudiantes = [
  { nombre: "Juan Perez", matricula: "12345678" },
  { nombre: "Ana Martinez", matricula: "12345679" },
  { nombre: "Carlos Rodriguez", matricula: "12345680" },
  { nombre: "Maria Sanchez", matricula: "12345681" },
  { nombre: "Luis Fernandez", matricula: "12345682" },
]

export default function GestionPasantiasPage() {
  const [pasantias, setPasantias] = useState<Pasantia[]>(pasantiasIniciales)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEstado, setFilterEstado] = useState("todos")
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [, setIsEditDialogOpen] = useState(false)
  const [isAsignarDialogOpen, setIsAsignarDialogOpen] = useState(false)
  const [selectedPasantia, setSelectedPasantia] = useState<Pasantia | null>(null)

  const [newPasantia, setNewPasantia] = useState({
    estudiante: "",
    matricula: "",
    taller: "",
    centroTrabajo: "",
    tutor: "",
    fechaInicio: "",
    fechaFin: "",
    horasRequeridas: "480",
    observaciones: ""
  })

  const filteredPasantias = pasantias.filter(p => {
    const matchesSearch = p.estudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.matricula.includes(searchTerm) ||
      p.taller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.centroTrabajo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEstado = filterEstado === "todos" || p.estado === filterEstado
    return matchesSearch && matchesEstado
  })

  const stats = {
    total: pasantias.length,
    activas: pasantias.filter(p => p.estado === "activa").length,
    completadas: pasantias.filter(p => p.estado === "completada").length,
    pendientes: pasantias.filter(p => p.estado === "pendiente").length,
  }

  const getEstadoBadge = (estado: Pasantia["estado"]) => {
    const styles = {
      activa: "bg-emerald-50 text-emerald-700 border-emerald-200",
      completada: "bg-blue-50 text-blue-700 border-blue-200",
      suspendida: "bg-red-50 text-red-700 border-red-200",
      pendiente: "bg-amber-50 text-amber-700 border-amber-200",
    }
    const icons = {
      activa: <CheckCircle className="h-3.5 w-3.5" />,
      completada: <CheckCircle className="h-3.5 w-3.5" />,
      suspendida: <XCircle className="h-3.5 w-3.5" />,
      pendiente: <Clock className="h-3.5 w-3.5" />,
    }
    const labels = {
      activa: "Activa",
      completada: "Completada",
      suspendida: "Suspendida",
      pendiente: "Pendiente",
    }
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[estado]}`}>
        {icons[estado]}
        {labels[estado]}
      </span>
    )
  }

  const handleCreatePasantia = () => {
    const newId = `PAS-${String(pasantias.length + 1).padStart(3, "0")}`
    const pasantia: Pasantia = {
      id: newId,
      estudiante: newPasantia.estudiante,
      matricula: newPasantia.matricula,
      taller: newPasantia.taller,
      centroTrabajo: newPasantia.centroTrabajo,
      tutor: newPasantia.tutor,
      fechaInicio: newPasantia.fechaInicio,
      fechaFin: newPasantia.fechaFin,
      horasCompletadas: 0,
      horasRequeridas: parseInt(newPasantia.horasRequeridas),
      estado: "pendiente",
      observaciones: newPasantia.observaciones
    }
    setPasantias([...pasantias, pasantia])
    setIsNewDialogOpen(false)
    setNewPasantia({
      estudiante: "",
      matricula: "",
      taller: "",
      centroTrabajo: "",
      tutor: "",
      fechaInicio: "",
      fechaFin: "",
      horasRequeridas: "480",
      observaciones: ""
    })
    console.log("Pasantia creada:", pasantia)
  }

  const handleDeletePasantia = (id: string) => {
    setPasantias(pasantias.filter(p => p.id !== id))
    console.log("Pasantia eliminada:", id)
  }

  const handleUpdateEstado = (id: string, nuevoEstado: Pasantia["estado"]) => {
    setPasantias(pasantias.map(p => 
      p.id === id ? { ...p, estado: nuevoEstado } : p
    ))
    console.log("Estado actualizado:", id, nuevoEstado)
  }

  const handleExport = () => {
    const csv = [
      ["ID", "Estudiante", "Matricula", "Taller", "Centro de Trabajo", "Tutor", "Fecha Inicio", "Fecha Fin", "Horas Completadas", "Horas Requeridas", "Estado"],
      ...filteredPasantias.map(p => [
        p.id, p.estudiante, p.matricula, p.taller, p.centroTrabajo, p.tutor, p.fechaInicio, p.fechaFin, p.horasCompletadas, p.horasRequeridas, p.estado
      ])
    ].map(row => row.join(",")).join("\n")
    
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "pasantias.csv"
    a.click()
    console.log("Exportando pasantias...")
  }

  return (
    <Main>
      <Suspense fallback={<Loading />}>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">Gestion de Pasantias</h1>
              </div>
              <p className="text-muted-foreground ml-12">
                Administra y supervisa todas las pasantias del sistema
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="border bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Pasantias</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stats.total}</p>
                    </div>
                    <div className="p-3 rounded-full bg-slate-100">
                      <Briefcase className="h-5 w-5 text-slate-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Activas</p>
                      <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.activas}</p>
                    </div>
                    <div className="p-3 rounded-full bg-emerald-100">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completadas</p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">{stats.completadas}</p>
                    </div>
                    <div className="p-3 rounded-full bg-blue-100">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pendientes</p>
                      <p className="text-2xl font-bold text-amber-600 mt-1">{stats.pendientes}</p>
                    </div>
                    <div className="p-3 rounded-full bg-amber-100">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Card className="border">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleExport}
                      className="gap-2 bg-transparent"
                    >
                      <Download className="h-4 w-4" />
                      Exportar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsAsignarDialogOpen(true)}
                      className="gap-2"
                    >
                      <UserPlus className="h-4 w-4" />
                      Asignar Estudiante
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => setIsNewDialogOpen(true)}
                      className="gap-2 bg-primary hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4" />
                      Nueva Pasantia
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por estudiante, matrícula, taller o centro..."
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
                      <SelectItem value="activa">Activa</SelectItem>
                      <SelectItem value="completada">Completada</SelectItem>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="suspendida">Suspendida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Results count */}
                <p className="text-sm text-muted-foreground mb-4">
                  Mostrando {filteredPasantias.length} de {pasantias.length} pasantias
                </p>

                {/* Table */}
                {filteredPasantias.length > 0 ? (
                  <div className="rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-semibold">ID</TableHead>
                          <TableHead className="font-semibold">Estudiante</TableHead>
                          <TableHead className="font-semibold">Taller</TableHead>
                          <TableHead className="font-semibold">Centro de Trabajo</TableHead>
                          <TableHead className="font-semibold">Tutor</TableHead>
                          <TableHead className="font-semibold">Progreso</TableHead>
                          <TableHead className="font-semibold">Estado</TableHead>
                          <TableHead className="font-semibold text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPasantias.map((pasantia) => (
                          <TableRow key={pasantia.id} className="hover:bg-muted/30">
                            <TableCell className="font-medium text-primary">{pasantia.id}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{pasantia.estudiante}</p>
                                <p className="text-xs text-muted-foreground">{pasantia.matricula}</p>
                              </div>
                            </TableCell>
                            <TableCell>{pasantia.taller}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                {pasantia.centroTrabajo}
                              </div>
                            </TableCell>
                            <TableCell>{pasantia.tutor}</TableCell>
                            <TableCell>
                              <div className="w-32">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>{pasantia.horasCompletadas}h</span>
                                  <span className="text-muted-foreground">{pasantia.horasRequeridas}h</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary rounded-full transition-all"
                                    style={{ width: `${(pasantia.horasCompletadas / pasantia.horasRequeridas) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getEstadoBadge(pasantia.estado)}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => {
                                    setSelectedPasantia(pasantia)
                                    setIsViewDialogOpen(true)
                                  }}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Ver detalles
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => {
                                    setSelectedPasantia(pasantia)
                                    setIsEditDialogOpen(true)
                                  }}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                  </DropdownMenuItem>
                                  {pasantia.estado === "activa" && (
                                    <DropdownMenuItem onClick={() => handleUpdateEstado(pasantia.id, "completada")}>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Marcar completada
                                    </DropdownMenuItem>
                                  )}
                                  {pasantia.estado === "pendiente" && (
                                    <DropdownMenuItem onClick={() => handleUpdateEstado(pasantia.id, "activa")}>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Activar
                                    </DropdownMenuItem>
                                  )}
                                  {pasantia.estado === "activa" && (
                                    <DropdownMenuItem onClick={() => handleUpdateEstado(pasantia.id, "suspendida")}>
                                      <AlertCircle className="h-4 w-4 mr-2" />
                                      Suspender
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem 
                                    onClick={() => handleDeletePasantia(pasantia.id)}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Eliminar
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                      <Briefcase className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">No hay pasantias</h3>
                    <p className="text-muted-foreground mb-4">No se encontraron pasantias que coincidan con la busqueda</p>
                    <Button onClick={() => setIsNewDialogOpen(true)} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Crear nueva pasantia
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dialog: Nueva Pasantia */}
            <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Nueva Pasantia
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Estudiante</Label>
                      <Select 
                        value={newPasantia.estudiante} 
                        onValueChange={(v) => {
                          const est = estudiantes.find(e => e.nombre === v)
                          setNewPasantia({...newPasantia, estudiante: v, matricula: est?.matricula || ""})
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estudiante" />
                        </SelectTrigger>
                        <SelectContent>
                          {estudiantes.map(est => (
                            <SelectItem key={est.matricula} value={est.nombre}>
                              {est.nombre} - {est.matricula}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Taller</Label>
                      <Select value={newPasantia.taller} onValueChange={(v) => setNewPasantia({...newPasantia, taller: v})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar taller" />
                        </SelectTrigger>
                        <SelectContent>
                          {talleres.filter(t => t !== "Todos").map(taller => (
                            <SelectItem key={taller} value={taller}>{taller}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Centro de Trabajo</Label>
                      <Select value={newPasantia.centroTrabajo} onValueChange={(v) => setNewPasantia({...newPasantia, centroTrabajo: v})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar centro" />
                        </SelectTrigger>
                        <SelectContent>
                          {centros.map(centro => (
                            <SelectItem key={centro} value={centro}>{centro}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tutor Asignado</Label>
                      <Select value={newPasantia.tutor} onValueChange={(v) => setNewPasantia({...newPasantia, tutor: v})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tutor" />
                        </SelectTrigger>
                        <SelectContent>
                          {tutores.map(tutor => (
                            <SelectItem key={tutor} value={tutor}>{tutor}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Fecha de Inicio</Label>
                      <Input 
                        type="date" 
                        value={newPasantia.fechaInicio}
                        onChange={(e) => setNewPasantia({...newPasantia, fechaInicio: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Fecha de Fin</Label>
                      <Input 
                        type="date" 
                        value={newPasantia.fechaFin}
                        onChange={(e) => setNewPasantia({...newPasantia, fechaFin: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Horas Requeridas</Label>
                      <Input 
                        type="number" 
                        value={newPasantia.horasRequeridas}
                        onChange={(e) => setNewPasantia({...newPasantia, horasRequeridas: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Observaciones</Label>
                    <Textarea 
                      placeholder="Notas adicionales sobre la pasantia..."
                      value={newPasantia.observaciones}
                      onChange={(e) => setNewPasantia({...newPasantia, observaciones: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreatePasantia} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Crear Pasantia
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Dialog: Ver Detalles */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Detalles de Pasantia
                  </DialogTitle>
                </DialogHeader>
                {selectedPasantia && (
                  <div className="space-y-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">ID de Pasantia</p>
                        <p className="text-lg font-semibold text-primary">{selectedPasantia.id}</p>
                      </div>
                      {getEstadoBadge(selectedPasantia.estado)}
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Users className="h-4 w-4" /> Estudiante
                          </p>
                          <p className="font-medium">{selectedPasantia.estudiante}</p>
                          <p className="text-sm text-muted-foreground">{selectedPasantia.matricula}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" /> Taller
                          </p>
                          <p className="font-medium">{selectedPasantia.taller}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Building2 className="h-4 w-4" /> Centro de Trabajo
                          </p>
                          <p className="font-medium">{selectedPasantia.centroTrabajo}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Users className="h-4 w-4" /> Tutor
                          </p>
                          <p className="font-medium">{selectedPasantia.tutor}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Calendar className="h-4 w-4" /> Periodo
                          </p>
                          <p className="font-medium">{selectedPasantia.fechaInicio} - {selectedPasantia.fechaFin}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Clock className="h-4 w-4" /> Progreso de Horas
                          </p>
                          <p className="font-medium">{selectedPasantia.horasCompletadas} / {selectedPasantia.horasRequeridas} horas</p>
                          <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(selectedPasantia.horasCompletadas / selectedPasantia.horasRequeridas) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {selectedPasantia.observaciones && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Observaciones</p>
                        <p className="p-3 bg-muted/50 rounded-lg text-sm">{selectedPasantia.observaciones}</p>
                      </div>
                    )}
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Cerrar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Dialog: Asignar Estudiante */}
            <Dialog open={isAsignarDialogOpen} onOpenChange={setIsAsignarDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-primary" />
                    Asignar Estudiante a Pasantia
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Seleccionar Estudiante</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Buscar estudiante..." />
                      </SelectTrigger>
                      <SelectContent>
                        {estudiantes.map(est => (
                          <SelectItem key={est.matricula} value={est.matricula}>
                            {est.nombre} - {est.matricula}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Seleccionar Centro de Trabajo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar centro..." />
                      </SelectTrigger>
                      <SelectContent>
                        {centros.map(centro => (
                          <SelectItem key={centro} value={centro}>{centro}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Seleccionar Plaza</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar plaza disponible..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plaza1">Desarrollador Junior - TechCorp</SelectItem>
                        <SelectItem value="plaza2">Asistente Administrativo - Consultores RD</SelectItem>
                        <SelectItem value="plaza3">Tecnico Automotriz - AutoService</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAsignarDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => {
                    console.log("Estudiante asignado")
                    setIsAsignarDialogOpen(false)
                  }} className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Asignar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Suspense>
    </Main>
  )
}
