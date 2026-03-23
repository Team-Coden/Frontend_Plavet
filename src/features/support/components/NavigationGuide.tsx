"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { 
  GraduationCap,
  Building2,
  Users,
  FileText,
  Briefcase,
  BarChart3,
  ArrowRight
} from "lucide-react"

const navigationGuide = [
  {
    module: "Gestión Académica",
    icon: GraduationCap,
    color: "text-blue-600",
    path: "/gestion-academica",
    submodules: [
      {
        name: "Estudiantes",
        path: "/gestion-academica/estudiantes",
        actions: ["Buscar estudiantes", "Registrar nuevo", "Editar datos", "Ver historial"],
        quickAccess: ["Búsqueda por cédula", "Filtro por estado", "Exportar lista"]
      },
      {
        name: "Talleres",
        path: "/gestion-academica/talleres",
        actions: ["Crear taller", "Ver inscripciones", "Controlar asistencia", "Generar certificados"],
        quickAccess: ["Búsqueda por nombre", "Filtro por estado", "Ver calendario"]
      },
      {
        name: "Tutores",
        path: "/gestion-academica/tutores",
        actions: ["Asignar tutor", "Ver disponibilidad", "Evaluar desempeño", "Coordinar reuniones"],
        quickAccess: ["Búsqueda por nombre", "Ver horarios", "Ver asignaciones"]
      }
    ]
  },
  {
    module: "Gestión Institucional",
    icon: Building2,
    color: "text-purple-600",
    path: "/gestion-institucional",
    submodules: [
      {
        name: "Centros de Trabajo",
        path: "/gestion-institucional/centros",
        actions: ["Registrar empresa", "Gestionar convenios", "Ver contactos", "Controlar cupos"],
        quickAccess: ["Búsqueda por nombre", "Filtro por estado", "Ver convenios vigentes"]
      },
      {
        name: "Plazas",
        path: "/gestion-institucional/plazas",
        actions: ["Crear plaza", "Asignar estudiante", "Controlar disponibilidad", "Ver ocupación"],
        quickAccess: ["Ver plazas disponibles", "Filtrar por centro", "Ver estadísticas"]
      },
      {
        name: "Tutores Institucionales",
        path: "/gestion-institucional/tutores",
        actions: ["Registrar tutor", "Asignar funciones", "Ver horarios", "Evaluar desempeño"],
        quickAccess: ["Búsqueda por nombre", "Ver disponibilidad", "Ver asignaciones"]
      }
    ]
  },
  {
    module: "Roles y Personal",
    icon: Users,
    color: "text-amber-600",
    path: "/roles-y-personal",
    submodules: [
      {
        name: "Supervisores",
        path: "/roles-y-personal/supervisores",
        actions: ["Asignar supervisor", "Ver pasantías", "Evaluar desempeño", "Generar reportes"],
        quickAccess: ["Búsqueda por nombre", "Ver pasantías activas", "Ver disponibilidad"]
      },
      {
        name: "Vinculadores",
        path: "/roles-y-personal/vinculadores",
        actions: ["Contactar empresas", "Promover oportunidades", "Coordinar eventos", "Gestionar relaciones"],
        quickAccess: ["Ver empresas activas", "Ver eventos próximos", "Ver contactos"]
      }
    ]
  },
  {
    module: "Documentación",
    icon: FileText,
    color: "text-green-600",
    path: "/documentacion",
    submodules: [
      {
        name: "Documentos",
        path: "/documentacion/archivos",
        actions: ["Subir archivo", "Organizar documentos", "Compartir archivos", "Controlar acceso"],
        quickAccess: ["Búsqueda rápida", "Filtrar por tipo", "Ver documentos recientes"]
      }
    ]
  },
  {
    module: "Evaluaciones",
    icon: FileText,
    color: "text-red-600",
    path: "/evaluaciones",
    submodules: [
      {
        name: "Evaluaciones",
        path: "/evaluaciones/formularios",
        actions: ["Crear evaluación", "Asignar estudiantes", "Revisar resultados", "Generar informes"],
        quickAccess: ["Ver evaluaciones pendientes", "Búsqueda por estudiante", "Ver estadísticas"]
      }
    ]
  },
  {
    module: "Proceso de Pasantías",
    icon: Briefcase,
    color: "text-indigo-600",
    path: "/proceso-de-pasantias",
    submodules: [
      {
        name: "Pasantías",
        path: "/proceso-de-pasantias/gestion",
        actions: ["Crear pasantía", "Asignar estudiante", "Seguir progreso", "Evaluar final"],
        quickAccess: ["Ver pasantías activas", "Búsqueda por empresa", "Ver próximas evaluaciones"]
      }
    ]
  },
  {
    module: "Reportes",
    icon: BarChart3,
    color: "text-teal-600",
    path: "/reportes",
    submodules: [
      {
        name: "Reportes",
        path: "/reportes/generacion",
        actions: ["Crear reporte", "Configurar filtros", "Generar PDF", "Ver estadísticas"],
        quickAccess: ["Reportes frecuentes", "Ver últimos generados", "Configurar alertas"]
      }
    ]
  }
]

export default function NavigationGuide() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Guía Rápida de Navegación</h2>
        <p className="text-muted-foreground">
          Acceso rápido a todas las funciones del sistema CHECKiNT
        </p>
      </div>

      <div className="grid gap-4">
        {navigationGuide.map((module) => {
          const IconComponent = module.icon
          return (
            <Card key={module.module} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${module.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{module.module}</CardTitle>
                    <CardDescription className="text-sm">
                      {module.submodules.length} submódulo{module.submodules.length > 1 ? 's' : ''}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {module.path}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {module.submodules.map((submodule, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        <ArrowRight className="h-3 w-3" />
                        {submodule.name}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {submodule.path}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Acciones Principales:</p>
                        <div className="flex flex-wrap gap-1">
                          {submodule.actions.map((action, actionIndex) => (
                            <Button key={actionIndex} variant="ghost" size="sm" className="h-6 text-xs px-2">
                              {action}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Acceso Rápido:</p>
                        <div className="flex flex-wrap gap-1">
                          {submodule.quickAccess.map((access, accessIndex) => (
                            <Badge key={accessIndex} variant="secondary" className="text-xs">
                              {access}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
