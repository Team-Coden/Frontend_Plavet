"use client"

import { useCalificaciones } from "../calificacion/hooks/useCalificaciones"
import Main from "@/features/main/pages/page"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Label } from "@/shared/components/ui/label"
import { Badge } from "@/shared/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { GraduationCap, Award, Table as TableIcon, FileText } from "lucide-react"
import { CalificacionTableRows } from "../calificacion/components/CalificacionTableRows"
import { useMemo } from "react"

const getNotaBadge = (notaFinal: string) => {
  const nota = parseFloat(notaFinal || '0');
  if (nota >= 90) {
    return <Badge className="[--badge-bg:oklch(95.01%_0.047_80.81)] [--badge-fg:oklch(40.83%_0.087_72.86)] [--badge-border:oklch(90.49%_0.092_81.19)] bg-(--badge-bg) text-(--badge-fg) border border-(--badge-border)">Excelente</Badge>;
  } else if (nota >= 80) {
    return <Badge className="[--badge-bg:oklch(92.23%_0.008_241.67)] [--badge-fg:oklch(41.61%_0.026_241.93)] [--badge-border:oklch(84.35%_0.014_240.99)] bg-(--badge-bg) text-(--badge-fg) border border-(--badge-border)">Muy Bueno</Badge>;
  } else if (nota >= 70) {
    return <Badge className="[--badge-bg:oklch(90.49%_0.092_81.19)] [--badge-fg:oklch(54.11%_0.117_70.57)] [--badge-border:oklch(86.11%_0.131_79.28)] bg-(--badge-bg) text-(--badge-fg) border border-(--badge-border)">Aprobado</Badge>;
  } else {
    return <Badge className="[--badge-bg:oklch(89.13%_0.058_10.39)] [--badge-fg:oklch(42.99%_0.175_25.91)] [--badge-border:oklch(79.14%_0.123_12.67)] bg-(--badge-bg) text-(--badge-fg) border border-(--badge-border)">Reprobado</Badge>;
  }
};

export default function MisCalificacionesPage() {
  const { paginatedEvaluaciones } = useCalificaciones()
  const evaluacion = paginatedEvaluaciones.length > 0 ? paginatedEvaluaciones[0] : null
  const notaBadge = useMemo(() => evaluacion ? getNotaBadge(evaluacion.notaFinal) : null, [evaluacion]);

  return (
    <Main>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground text-balance">
                Mis Calificaciones
              </h1>
            </div>
            <p className="text-muted-foreground ml-12">
              Visualiza tus resultados y calificaciones finales de las pasantías
            </p>
          </div>

          {!evaluacion ? (
            <Card className="border">
              <CardContent className="p-12 text-center flex flex-col items-center justify-center">
                <div className="p-4 rounded-full bg-muted mb-4 inline-block">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No hay calificaciones disponibles
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Tus calificaciones aparecerán aquí una vez que se complete el proceso de evaluación de tus pasantías.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Información Principal */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Información General
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <Avatar className="h-24 w-24 border-4 border-muted/50 shadow-sm">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${evaluacion.estudiante}`} alt={evaluacion.estudiante} />
                      <AvatarFallback className="text-3xl font-semibold bg-primary/10 text-primary">
                        {evaluacion.estudiante.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 w-full mt-2 sm:mt-0">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Estudiante</Label>
                        <p className="text-lg font-semibold">{evaluacion.estudiante}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Empresa</Label>
                        <p className="text-lg font-semibold">{evaluacion.empresa}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Fecha Evaluación</Label>
                        <p className="text-lg">{evaluacion.fechaEvaluacion}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">ID Evaluación</Label>
                        <p className="text-lg font-mono">#{evaluacion.id.slice(-6)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Promedios */}
              <Card>
                <CardHeader>
                  <CardTitle>Promedios por Categoría</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">C</span>
                      </div>
                      <Label className="text-sm font-medium">Capacidades</Label>
                      <p className="text-2xl font-bold text-blue-600">{evaluacion.promedioCapacidades}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">H</span>
                      </div>
                      <Label className="text-sm font-medium">Habilidades</Label>
                      <p className="text-2xl font-bold text-purple-600">{evaluacion.promedioHabilidades}</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">A</span>
                      </div>
                      <Label className="text-sm font-medium">Actitudes</Label>
                      <p className="text-2xl font-bold text-green-600">{evaluacion.promedioActitudes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Nota Final */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Resultado Final
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-4">
                      <Award className="h-12 w-12 text-yellow-500" />
                      <div>
                        <p className="text-5xl font-bold text-primary">{evaluacion.notaFinal}</p>
                        <p className="text-sm text-muted-foreground">Nota Final</p>
                      </div>
                      <div className="text-2xl">
                        {notaBadge}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Datos Completos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TableIcon className="h-5 w-5" />
                    Datos Completos de Evaluación
                  </CardTitle>
                  <CardDescription>
                    Todos los valores de la evaluación en una tabla unificada
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="border border-border px-4 py-2 text-left font-semibold">Categoría</th>
                          <th className="border border-border px-2 py-2 text-center font-semibold">1</th>
                          <th className="border border-border px-2 py-2 text-center font-semibold">2</th>
                          <th className="border border-border px-2 py-2 text-center font-semibold">3</th>
                          <th className="border border-border px-2 py-2 text-center font-semibold">4</th>
                          <th className="border border-border px-2 py-2 text-center font-semibold">5</th>
                          <th className="border border-border px-2 py-2 text-center font-semibold">6</th>
                          <th className="border border-border px-2 py-2 text-center font-semibold">7</th>
                          <th className="border border-border px-2 py-2 text-center font-semibold">8</th>
                          <th className="border border-border px-2 py-2 text-center font-semibold">9</th>
                          <th className="border border-border px-2 py-2 text-center font-semibold">10</th>
                          <th className="border border-border px-2 py-2 text-center font-semibold">11</th>
                          <th className="border border-border px-2 py-2 text-center font-semibold">12</th>
                        </tr>
                      </thead>
                      <tbody>
                        <CalificacionTableRows evaluacion={evaluacion} />
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Main>
  )
}
