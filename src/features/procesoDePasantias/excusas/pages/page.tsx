"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../../shared/components/ui/card"
import { FileText, Send } from "lucide-react"
import { useExcusas } from "../hooks/useExcusas"
import { ExcusaForm } from "../components/ExcusaForm"
import { ExcusaTable } from "../components/ExcusaTable"
import Main from "@/features/main/pages/page"

export default function ExcusasPage() {
  const {
    filteredExcuses,
    selectedFile,
    formData,
    filters,
    handleFileChange,
    handleSubmit,
    updateFormData,
    updateFilters,
    handleEditExcuse,
    handleDeleteExcuse,
    getEstadoBadge,
  } = useExcusas()

  return (
    <Main>
      <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3 text-foreground flex items-center gap-3">
              <FileText className="h-10 w-10" />
              Enviar Excusa
            </h1>
            <p className="text-muted-foreground text-lg">Sistema de Gestión de Pasantías CHECKINT IN</p>
          </div>

          {/* Form Card */}
          <Card className="mb-8 border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Registrar Nueva Excusa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ExcusaForm
                formData={formData}
                selectedFile={selectedFile}
                onSubmit={handleSubmit}
                onFileChange={handleFileChange}
                onFormDataChange={updateFormData}
              />
            </CardContent>
          </Card>

          {/* Registered Excuses */}
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle>Excusas Registradas</CardTitle>
            </CardHeader>
            <CardContent>
              <ExcusaTable
                excuses={filteredExcuses}
                filters={filters}
                onFiltersChange={updateFilters}
                getEstadoBadge={getEstadoBadge}
                onEdit={handleEditExcuse}
                onDelete={handleDeleteExcuse}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Main>
  )
}
