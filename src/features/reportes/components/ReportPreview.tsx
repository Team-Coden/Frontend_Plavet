// ==========================================
// Componente de Vista Previa de Reportes con Gráficos
// ==========================================

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Button } from "../../../shared/components/ui/button"
import { Download, Eye, BarChart3, PieChart, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/components/ui/select"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from "recharts"
import jsPDF from "jspdf"
import domtoimage from "dom-to-image"
import { ReporteService } from "../service/reporteService"

interface ReportPreviewProps {
  reportType: string
  filters: {
    taller: string
    periodo: string
    formato: string
  }
  onClose: () => void
}

interface ChartDataPoint {
  name: string
  [key: string]: string | number
}

interface PieDataPoint {
  name: string
  value: number
  color: string
  [key: string]: string | number
}

interface TableDataPoint {
  [key: string]: string | number
}

interface ReportData {
  title: string
  icon?: string
  summary: Record<string, number | string>
  chartData: ChartDataPoint[]
  pieData: PieDataPoint[]
  tableData?: TableDataPoint[]
}

// Lista de talleres disponibles
const talleresDisponibles = [
  { id: "desarrollo-web", nombre: "Desarrollo Web" },
  { id: "diseno-ux", nombre: "Diseño UX" },
  { id: "marketing-digital", nombre: "Marketing Digital" },
  { id: "data-science", nombre: "Data Science" },
  { id: "movil", nombre: "Desarrollo Móvil" },
  { id: "cloud", nombre: "Cloud Computing" },
]

export const ReportPreview = ({ reportType, filters, onClose }: ReportPreviewProps) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [showTallerSelector, setShowTallerSelector] = useState(true)
  const [selectedTaller, setSelectedTaller] = useState(filters.taller || "")
  const [currentPeriodo, setCurrentPeriodo] = useState(filters.periodo || "2024")
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Cargar datos del reporte usando el service
  useEffect(() => {
    const loadReportData = async () => {
      try {
        setLoading(true)
        const data = await ReporteService.getReporteData(reportType)
        setReportData(data)
      } catch (error) {
        console.error('Error cargando datos del reporte:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadReportData()
  }, [reportType])
  
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos del reporte...</p>
        </div>
      </div>
    )
  }
  
  if (!reportData) return null

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    
    try {
      console.log('🚀 Iniciando generación de PDF con dom-to-image...')
      console.log('📍 Navegador:', navigator.userAgent)
      
      const element = document.getElementById('report-preview-content')
      if (!element) {
        console.error('❌ No se encontró el elemento report-preview-content')
        alert('Error: No se encontró el contenido del reporte')
        return
      }
      
      console.log('✅ Elemento encontrado:', element)
      console.log('📐 Dimensiones del elemento:', {
        scrollWidth: element.scrollWidth,
        scrollHeight: element.scrollHeight,
        offsetWidth: element.offsetWidth,
        offsetHeight: element.offsetHeight
      })
      
      // Usar dom-to-image en lugar de html2canvas
      const dataUrl = await domtoimage.toPng(element, {
        quality: 1.0,
        width: element.scrollWidth,
        height: element.scrollHeight,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      })
      
      console.log('🖼️ Imagen generada con dom-to-image, tamaño:', dataUrl.length)
      
      // Crear PDF con jsPDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      
      // Crear imagen para obtener dimensiones
      const img = new Image()
      img.src = dataUrl
      
      await new Promise((resolve) => {
        img.onload = resolve
      })
      
      const imgWidth = pdfWidth
      const imgHeight = (img.height * pdfWidth) / img.width
      
      console.log('📄 Dimensiones PDF:', { pdfWidth, pdfHeight, imgWidth, imgHeight })
      
      if (imgHeight <= pdfHeight) {
        // Una sola página
        pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight)
        console.log('📄 PDF de una página agregado')
      } else {
        // Múltiples páginas
        const totalPages = Math.ceil(imgHeight / pdfHeight)
        console.log('📄 PDF de', totalPages, 'páginas')
        for (let i = 0; i < totalPages; i++) {
          if (i > 0) pdf.addPage()
          const yOffset = -(i * pdfHeight)
          pdf.addImage(dataUrl, 'PNG', 0, yOffset, imgWidth, imgHeight)
        }
      }
      
      const fileName = `${reportData.title.replace(/\s+/g, '_')}_${selectedTaller || 'todos'}_${filters.periodo}.pdf`
      console.log('💾 Guardando PDF:', fileName)
      
      pdf.save(fileName)
      console.log('✅ PDF descargado exitosamente')
      
    } catch (error) {
      console.error('❌ Error general generando PDF:', error)
      console.error('❌ Stack trace:', (error as Error).stack)
      alert(`Error al generar el PDF: ${(error as Error).message || 'Error desconocido'}`)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const Icon = reportData.icon ? FileText : FileText

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b p-6 bg-linear-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{reportData.title}</h2>
                <p className="text-gray-600">
                  Taller: {selectedTaller || "Todos"} | Período: {currentPeriodo === "todos" ? "Todos" : currentPeriodo}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-32">
                <Select value={currentPeriodo} onValueChange={setCurrentPeriodo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="todos">Todos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                onClick={onClose}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                Cerrar Vista Previa
              </Button>
              <Button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4" />
                {isGeneratingPDF ? "Generando..." : "Descargar PDF"}
              </Button>
            </div>
          </div>
        </div>

        {/* Selector de Talleres */}
        {showTallerSelector && (
          <div className="p-6 border-b bg-gray-50">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold mb-4 text-center">Selecciona un Taller para Ver el Reporte</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {talleresDisponibles.map((taller) => (
                  <Card 
                    key={taller.id}
                    className={`cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border-2 ${
                      selectedTaller === taller.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => {
                      setSelectedTaller(taller.id)
                      setShowTallerSelector(false)
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-lg font-medium">{taller.nombre}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {taller.id === 'desarrollo-web' && '15 estudiantes activos'}
                        {taller.id === 'diseno-ux' && '12 estudiantes activos'}
                        {taller.id === 'marketing-digital' && '8 estudiantes activos'}
                        {taller.id === 'data-science' && '10 estudiantes activos'}
                        {taller.id === 'movil' && '6 estudiantes activos'}
                        {taller.id === 'cloud' && '4 estudiantes activos'}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border-2 ${
                    selectedTaller === "todos" 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => {
                    setSelectedTaller("todos")
                    setShowTallerSelector(false)
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-lg font-medium">Todos los Talleres</div>
                    <div className="text-sm text-gray-600 mt-1">55 estudiantes en total</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {!showTallerSelector && (
          <div id="report-preview-content" className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-white">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {Object.entries(reportData.summary).map(([key, value]) => (
                <Card key={key} className="border-2">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600">{value}</div>
                    <div className="text-sm text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Tendencias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={reportData.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="estudiantes" fill="#3b82f6" />
                      <Bar dataKey="pasantias" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Distribución
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={reportData.pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {reportData.pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Detalles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        {reportData.tableData && Object.keys(reportData.tableData[0]).map((key) => (
                          <th key={key} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.tableData?.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          {Object.values(row).map((value, cellIndex) => (
                            <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
