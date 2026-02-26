"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shared/components/ui/card"
import { Button } from "../../shared/components/ui/button"
import { FileText, Star, Building2, FolderOpen, Eye } from "lucide-react"
import { useState } from "react"
import { ReportPreview } from "./components/ReportPreview"
import Main from "../main/pages/page"

interface ReportCard {
  id: string
  title: string
  description: string
  icon: typeof FileText
  color: string
  bgColor: string
}

export default function ReportesPage() {
  const [showPreview, setShowPreview] = useState<string | null>(null)
  const [filters] = useState({
    taller: "",
    periodo: "2024",
    formato: "pdf",
  })

  const reports: ReportCard[] = [
    {
      id: "estudiantes-pasantias",
      title: "Reporte de Estudiantes y Pasantías",
      description: "Genera un reporte detallado de estudiantes y sus pasantías, filtrado por taller",
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900",
    },
    {
      id: "calificaciones",
      title: "Reporte de Calificaciones",
      description: "Genera un reporte de calificaciones de estudiantes por taller",
      icon: Star,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900",
    },
    {
      id: "asignaciones",
      title: "Reporte de Asignaciones",
      description: "Genera un reporte de estudiantes asignados a centros de trabajo",
      icon: Building2,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900",
    },
    {
      id: "documentacion",
      title: "Documentación Estudiante",
      description: "Genera un reporte de los documentos subidos por los estudiantes activos de un taller y año",
      icon: FolderOpen,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900",
    },
  ]

  const handleShowPreview = (reportId: string) => {
    setShowPreview(reportId)
  }

  const handleClosePreview = () => {
    setShowPreview(null)
  }

  return (
    <Main>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-3 text-foreground">Reportes</h1>
            <p className="text-muted-foreground text-lg">Sistema de Gestión de Pasantías CHECKINT IN</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {reports.map((report) => {
              const Icon = report.icon
              return (
                <Card
                  key={report.id}
                  className={`${report.bgColor} border-2 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]`}
                  onClick={() => handleShowPreview(report.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full p-4 ${report.bgColor}`}>
                        <Icon className={`h-8 w-8 ${report.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{report.title}</CardTitle>
                        <CardDescription className="text-sm">{report.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Vista Previa
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Info Card */}
          <Card className="bg-linear-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">¿Cómo generar reportes?</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-800">
              <ol className="list-decimal list-inside space-y-2">
                <li>Selecciona el tipo de reporte que deseas generar</li>
                <li>Configura los filtros según tus necesidades (taller, período, formato)</li>
                <li>Previsualiza el reporte para verificar los datos</li>
                <li>Descarga el reporte en formato PDF</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Report Preview Modal */}
      {showPreview && (
        <ReportPreview
          reportType={showPreview}
          filters={filters}
          onClose={handleClosePreview}
        />
      )}
    </Main>
  )
}
