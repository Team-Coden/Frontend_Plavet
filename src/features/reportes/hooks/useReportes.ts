import { useState, useEffect } from 'react'
import { ReporteService } from '../service/reporteService'

export interface Reporte {
  id: string
  tipo: string
  titulo: string
  descripcion: string
  icono: string
  fecha: string
  estado: 'activo' | 'inactivo' | 'pendiente'
}

export interface ReporteFilters {
  taller: string
  periodo: string
  formato: string
}

export const useReportes = () => {
  const [reportes, setReportes] = useState<Reporte[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchReportes = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await ReporteService.getReportes()
      setReportes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar reportes')
    } finally {
      setLoading(false)
    }
  }

  const generateReporte = async (reporteId: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await ReporteService.generateReporte(reporteId)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar reporte')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReportes()
  }, [])

  return {
    reportes,
    loading,
    error,
    fetchReportes,
    generateReporte
  }
}
