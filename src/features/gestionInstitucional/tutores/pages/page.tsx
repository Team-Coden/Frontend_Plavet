"use client"

import type React from "react"

import { useState, Fragment } from "react"
import { Card, CardContent } from "../../../../shared/components/ui/card"
import { Button } from "../../../../shared/components/ui/button"
import { Input } from "../../../../shared/components/ui/input"
import { Badge } from "../../../../shared/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../shared/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../shared/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../shared/components/ui/dropdown-menu"
import { Label } from "../../../../shared/components/ui/label"
import { Textarea } from "../../../../shared/components/ui/textarea"
import Main from '../../../main/pages/page';
import {
  UserCircle,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  FileDown,
  Star,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronDown,
  ChevronRight,
  Building2,
  Award,
} from "lucide-react"

interface Tutor {
  id: string
  nombre: string
  apellido: string
  especialidad: string
  empresa: string
  email: string
  telefono: string
  experiencia: number
  calificacion: number
  estudiantesAsignados: number
  estado: "Activo" | "Pendiente" | "Inactivo"
  fechaRegistro: string
  ubicacion: string
  certificaciones: string[]
}

const initialTutores: Tutor[] = [
  {
    id: "TUT-001",
    nombre: "Carlos",
    apellido: "Martínez",
    especialidad: "Desarrollo de Software",
    empresa: "Tech Solutions S.A.",
    email: "carlos.martinez@techsol.com",
    telefono: "+52 55 1234 5678",
    experiencia: 8,
    calificacion: 4.8,
    estudiantesAsignados: 5,
    estado: "Activo",
    fechaRegistro: "15/01/2024",
    ubicacion: "Ciudad de México",
    certificaciones: ["Scrum Master", "AWS Certified"],
  },
  {
    id: "TUT-002",
    nombre: "Ana",
    apellido: "García",
    especialidad: "Diseño UX/UI",
    empresa: "Innovatech Corp",
    email: "ana.garcia@innovatech.com",
    telefono: "+52 81 9876 5432",
    experiencia: 6,
    calificacion: 4.9,
    estudiantesAsignados: 3,
    estado: "Activo",
    fechaRegistro: "20/02/2024",
    ubicacion: "Monterrey, NL",
    certificaciones: ["UX Certified", "Figma Expert"],
  },
  {
    id: "TUT-003",
    nombre: "Miguel",
    apellido: "Rodríguez",
    especialidad: "Análisis de Datos",
    empresa: "Data Insights Ltd",
    email: "miguel.rodriguez@datainsights.com",
    telefono: "+52 33 5555 1234",
    experiencia: 5,
    calificacion: 4.5,
    estudiantesAsignados: 0,
    estado: "Pendiente",
    fechaRegistro: "05/03/2024",
    ubicacion: "Guadalajara, Jal",
    certificaciones: ["Google Analytics", "Tableau Certified"],
  },
]

export default function TutoresPage() {
  const [tutores, setTutores] = useState<Tutor[]>(initialTutores)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEstado, setFilterEstado] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTutor, ] = useState<Tutor | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    especialidad: "",
    empresa: "",
    email: "",
    telefono: "",
    experiencia: "",
    ubicacion: "",
    certificaciones: "",
  })

  const filteredTutores = tutores.filter((tutor) => {
    const matchesSearch =
      tutor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.empresa.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterEstado === "all" || tutor.estado === filterEstado
    return matchesSearch && matchesFilter
  })

  const handleExport = () => {
    console.log("[v0] Exportando tutores:", filteredTutores)
    alert("Exportando lista de tutores...")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Registrando nuevo tutor:", formData)

    const newTutor: Tutor = {
      id: `TUT-${String(tutores.length + 1).padStart(3, "0")}`,
      nombre: formData.nombre,
      apellido: formData.apellido,
      especialidad: formData.especialidad,
      empresa: formData.empresa,
      email: formData.email,
      telefono: formData.telefono,
      experiencia: Number(formData.experiencia),
      calificacion: 0,
      estudiantesAsignados: 0,
      estado: "Pendiente",
      fechaRegistro: new Date().toLocaleDateString("es-ES"),
      ubicacion: formData.ubicacion,
      certificaciones: formData.certificaciones.split(",").map((c) => c.trim()),
    }

    setTutores([...tutores, newTutor])
    setIsDialogOpen(false)
    setFormData({
      nombre: "",
      apellido: "",
      especialidad: "",
      empresa: "",
      email: "",
      telefono: "",
      experiencia: "",
      ubicacion: "",
      certificaciones: "",
    })
  }

  const handleDelete = (id: string) => {
    console.log("[v0] Eliminando tutor:", id)
    if (confirm("¿Estás seguro de eliminar este tutor?")) {
      setTutores(tutores.filter((t) => t.id !== id))
    }
  }


  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Activo":
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{estado}</span>
          </div>
        )
      case "Pendiente":
        return (
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">{estado}</span>
          </div>
        )
      case "Inactivo":
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-gray-950/30 border border-gray-200 dark:border-gray-800">
            <XCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{estado}</span>
          </div>
        )
      default:
        return null
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <Main>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestión de Tutores</h1>
              <p className="text-muted-foreground mt-2">Administra los tutores de las plazas de trabajo</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Tutores</p>
                  <p className="text-3xl font-bold tracking-tight">{tutores.length}</p>
                  <p className="text-xs text-muted-foreground">Registrados</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 p-3 rounded-xl">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Tutores Activos</p>
                  <p className="text-3xl font-bold tracking-tight">
                    {tutores.filter((t) => t.estado === "Activo").length}
                  </p>
                  <p className="text-xs text-muted-foreground">En servicio</p>
                </div>
                <div className="bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Estudiantes Asignados</p>
                  <p className="text-3xl font-bold tracking-tight">
                    {tutores.reduce((acc, t) => acc + t.estudiantesAsignados, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 p-3 rounded-xl">
                  <GraduationCap className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Calificación Promedio</p>
                  <p className="text-3xl font-bold tracking-tight">
                    {(
                      tutores.reduce((acc, t) => acc + t.calificacion, 0) /
                      tutores.filter((t) => t.calificacion > 0).length
                    ).toFixed(1)}
                  </p>
                  <p className="text-xs text-muted-foreground">De 5.0</p>
                </div>
                <div className="bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 p-3 rounded-xl">
                  <Star className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, especialidad o empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterEstado} onValueChange={setFilterEstado}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleExport}>
                <FileDown className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button onClick={() => setIsDialogOpen(true)}>
                <UserCircle className="h-4 w-4 mr-2" />
                Registrar Tutor
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tutores Table with Expandable Rows */}
        <Card>
          <CardContent className="p-0">
            {filteredTutores.length === 0 ? (
              <div className="py-16">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="p-4 rounded-full bg-muted mb-4">
                    <Search className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron tutores</h3>
                  <p className="text-sm text-muted-foreground">Intenta ajustar los filtros o registra un nuevo tutor</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="w-12 p-4"></th>
                      <th className="text-left p-4 font-medium text-muted-foreground text-sm">Tutor</th>
                      <th className="text-left p-4 font-medium text-muted-foreground text-sm">Empresa</th>
                      <th className="text-center p-4 font-medium text-muted-foreground text-sm">Estudiantes</th>
                      <th className="text-center p-4 font-medium text-muted-foreground text-sm">Estado</th>
                      <th className="text-center p-4 font-medium text-muted-foreground text-sm">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTutores.map((tutor) => (
                      <Fragment key={tutor.id}>
                        {/* Main Row */}
                        <tr 
                          className={`border-b border-border hover:bg-muted/30 transition-colors cursor-pointer ${expandedRows.has(tutor.id) ? 'bg-muted/20' : ''}`}
                          onClick={() => toggleRow(tutor.id)}
                        >
                          <td className="p-4">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              {expandedRows.has(tutor.id) ? (
                                <ChevronDown className="h-4 w-4 text-primary" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-full bg-primary/10 border border-primary/20">
                                <UserCircle className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{tutor.nombre} {tutor.apellido}</p>
                                <p className="text-xs text-muted-foreground">{tutor.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-foreground">{tutor.empresa}</span>
                          </td>
                          <td className="p-4 text-center">
                            <span className="text-sm font-medium text-foreground">{tutor.estudiantesAsignados}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-center">{getEstadoBadge(tutor.estado)}</div>
                          </td>
                          <td className="p-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex justify-center">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(tutor.id)}>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Eliminar
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                        
                        {/* Expanded Row */}
                        {expandedRows.has(tutor.id) && (
                          <tr className="bg-muted/10 border-b border-border">
                            <td colSpan={6} className="p-0">
                              <div className="px-6 py-4 ml-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                  {/* Especialidad */}
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <Briefcase className="h-4 w-4" />
                                      <span className="text-xs font-medium uppercase tracking-wide">Especialidad</span>
                                    </div>
                                    <p className="text-sm font-medium text-foreground">{tutor.especialidad}</p>
                                  </div>
                                  
                                  {/* Contacto */}
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <Mail className="h-4 w-4" />
                                      <span className="text-xs font-medium uppercase tracking-wide">Contacto</span>
                                    </div>
                                    <p className="text-sm text-foreground">{tutor.email}</p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                      <Phone className="h-3 w-3" />
                                      {tutor.telefono}
                                    </p>
                                  </div>
                                  
                                  {/* Experiencia y Ubicacion */}
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <Building2 className="h-4 w-4" />
                                      <span className="text-xs font-medium uppercase tracking-wide">Informacion</span>
                                    </div>
                                    <p className="text-sm text-foreground">{tutor.experiencia} años de experiencia</p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                      <MapPin className="h-3 w-3" />
                                      {tutor.ubicacion}
                                    </p>
                                  </div>
                                  
                                  {/* Calificacion */}
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <Star className="h-4 w-4" />
                                      <span className="text-xs font-medium uppercase tracking-wide">Calificacion</span>
                                    </div>
                                    <div>{renderStars(tutor.calificacion)}</div>
                                  </div>
                                </div>
                                
                                {/* Certificaciones */}
                                {tutor.certificaciones.length > 0 && (
                                  <div className="mt-4 pt-4 border-t border-border">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                      <Award className="h-4 w-4" />
                                      <span className="text-xs font-medium uppercase tracking-wide">Certificaciones</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {tutor.certificaciones.map((cert, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                          {cert}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {/* Fecha de Registro */}
                                <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  <span className="text-xs">Registrado el {tutor.fechaRegistro}</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mt-4 text-sm text-muted-foreground text-center">
          Mostrando {filteredTutores.length} de {tutores.length} tutores
        </div>
      </div>

      {/* Register Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              Registrar Nuevo Tutor
            </DialogTitle>
            <DialogDescription>Completa la información del tutor de plaza de trabajo</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    placeholder="Ej: Carlos"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    placeholder="Ej: Martínez"
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="especialidad">Especialidad *</Label>
                <Select
                  value={formData.especialidad}
                  onValueChange={(value) => setFormData({ ...formData, especialidad: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Desarrollo de Software">Desarrollo de Software</SelectItem>
                    <SelectItem value="Diseño UX/UI">Diseño UX/UI</SelectItem>
                    <SelectItem value="Análisis de Datos">Análisis de Datos</SelectItem>
                    <SelectItem value="Marketing Digital">Marketing Digital</SelectItem>
                    <SelectItem value="Gestión de Proyectos">Gestión de Proyectos</SelectItem>
                    <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="empresa">Empresa *</Label>
                <Select
                  value={formData.empresa}
                  onValueChange={(value) => setFormData({ ...formData, empresa: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tech Solutions S.A.">Tech Solutions S.A.</SelectItem>
                    <SelectItem value="Innovatech Corp">Innovatech Corp</SelectItem>
                    <SelectItem value="Digital Dynamics">Digital Dynamics</SelectItem>
                    <SelectItem value="Data Insights Ltd">Data Insights Ltd</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@ejemplo.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="telefono"
                      placeholder="+52 55 1234 5678"
                      className="pl-10"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experiencia">Años de Experiencia *</Label>
                  <Input
                    id="experiencia"
                    type="number"
                    min="0"
                    placeholder="Ej: 5"
                    value={formData.experiencia}
                    onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ubicacion">Ubicación *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="ubicacion"
                      placeholder="Ej: Ciudad de México"
                      className="pl-10"
                      value={formData.ubicacion}
                      onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificaciones">Certificaciones (separadas por comas)</Label>
                <Textarea
                  id="certificaciones"
                  placeholder="Ej: Scrum Master, AWS Certified, Project Management"
                  value={formData.certificaciones}
                  onChange={(e) => setFormData({ ...formData, certificaciones: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Registrar Tutor</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              Detalles del Tutor
            </DialogTitle>
          </DialogHeader>
          {selectedTutor && (
            <div className="space-y-6 py-4">
              {/* Header */}
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
                  <UserCircle className="h-12 w-12 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">
                    {selectedTutor.nombre} {selectedTutor.apellido}
                  </h3>
                  <p className="text-sm text-muted-foreground">{selectedTutor.id}</p>
                  <div className="mt-2">{renderStars(selectedTutor.calificacion)}</div>
                </div>
                {getEstadoBadge(selectedTutor.estado)}
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Especialidad</p>
                  <p className="text-sm text-foreground flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    {selectedTutor.especialidad}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Empresa</p>
                  <p className="text-sm text-foreground">{selectedTutor.empresa}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Experiencia</p>
                  <p className="text-sm text-foreground">{selectedTutor.experiencia} años</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Ubicación</p>
                  <p className="text-sm text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {selectedTutor.ubicacion}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Estudiantes Asignados</p>
                  <p className="text-sm text-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {selectedTutor.estudiantesAsignados}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Fecha de Registro</p>
                  <p className="text-sm text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {selectedTutor.fechaRegistro}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">Información de Contacto</p>
                <div className="space-y-2">
                  <p className="text-sm text-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {selectedTutor.email}
                  </p>
                  <p className="text-sm text-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {selectedTutor.telefono}
                  </p>
                </div>
              </div>

              {/* Certifications */}
              {selectedTutor.certificaciones.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-3">Certificaciones</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTutor.certificaciones.map((cert, index) => (
                      <Badge key={index} variant="secondary">
                        {cert}
                      </Badge>
                    ))}
                  </div>
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
     
    </div>
     </Main>
  )
}
