import type { Reporte } from '../hooks/useReportes'

export class ReporteService {
  static async getReportes(): Promise<Reporte[]> {
    // Simulación de datos - reemplazar con llamada real a API
    const mockReportes: Reporte[] = [
      {
        id: '1',
        tipo: 'estudiantes-pasantias',
        titulo: 'Reporte de Estudiantes y Pasantías',
        descripcion: 'Análisis completo de estudiantes en pasantías activas y su progreso',
        icono: 'Users',
        fecha: '2024-01-15',
        estado: 'activo'
      },
      {
        id: '2',
        tipo: 'calificaciones',
        titulo: 'Reporte de Calificaciones',
        descripcion: 'Estadísticas de calificaciones por taller y evaluador',
        icono: 'Star',
        fecha: '2024-01-10',
        estado: 'activo'
      },
      {
        id: '3',
        tipo: 'asignaciones',
        titulo: 'Reporte de Asignaciones',
        descripcion: 'Control de asignaciones de estudiantes a empresas',
        icono: 'Building2',
        fecha: '2024-01-08',
        estado: 'activo'
      },
      {
        id: '4',
        tipo: 'documentacion',
        titulo: 'Reporte de Documentación Estudiantil',
        descripcion: 'Seguimiento de documentos entregados por estudiantes',
        icono: 'FolderOpen',
        fecha: '2024-01-05',
        estado: 'pendiente'
      }
    ]

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return mockReportes
  }

  static async generateReporte(reporteId: string): Promise<Blob> {
    // Simulación de generación de reporte
    console.log(`Generando reporte ${reporteId}`)
    
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // En un caso real, esto devolvería el PDF generado
    return new Blob(['PDF content'], { type: 'application/pdf' })
  }

  static async getReporteData(reporteType: string) {
    // Datos mock según el tipo de reporte
    const mockData = {
      'estudiantes-pasantias': {
        title: 'Reporte de Estudiantes y Pasantías',
        summary: {
          totalEstudiantes: 45,
          pasantiasActivas: 32,
          pasantiasCompletadas: 28,
          empresasParticipantes: 15
        },
        chartData: [
          { name: 'Enero', estudiantes: 12, pasantias: 8 },
          { name: 'Febrero', estudiantes: 15, pasantias: 10 },
          { name: 'Marzo', estudiantes: 18, pasantias: 14 },
          { name: 'Abril', estudiantes: 22, pasantias: 18 },
          { name: 'Mayo', estudiantes: 25, pasantias: 20 },
          { name: 'Junio', estudiantes: 30, pasantias: 25 }
        ],
        pieData: [
          { name: 'Desarrollo Web', value: 35, color: '#3b82f6' },
          { name: 'Diseño UX', value: 25, color: '#10b981' },
          { name: 'Marketing Digital', value: 20, color: '#f59e0b' },
          { name: 'Data Science', value: 20, color: '#8b5cf6' }
        ]
      },
      'calificaciones': {
        title: 'Reporte de Calificaciones',
        summary: {
          totalCalificaciones: 156,
          promedioGeneral: 8.5,
          calificacionesAltas: 89,
          calificacionesBajas: 12
        },
        chartData: [
          { name: 'Desarrollo Web', promedio: 8.7, total: 45 },
          { name: 'Diseño UX', promedio: 8.2, total: 38 },
          { name: 'Marketing Digital', promedio: 8.9, total: 42 },
          { name: 'Data Science', promedio: 8.1, total: 31 }
        ],
        pieData: [
          { name: 'Excelente (9-10)', value: 45, color: '#10b981' },
          { name: 'Bueno (7-8)', value: 78, color: '#3b82f6' },
          { name: 'Regular (5-6)', value: 25, color: '#f59e0b' },
          { name: 'Insuficiente (<5)', value: 8, color: '#ef4444' }
        ]
      },
      'asignaciones': {
        title: 'Reporte de Asignaciones',
        summary: {
          totalAsignaciones: 67,
          empresasActivas: 23,
          plazasDisponibles: 15,
          asignacionesPendientes: 8
        },
        chartData: [
          { name: 'TechCorp', asignados: 12, capacidad: 15 },
          { name: 'DesignHub', asignados: 8, capacidad: 10 },
          { name: 'AdAgency', asignados: 6, capacidad: 8 },
          { name: 'DataLab', asignados: 10, capacidad: 12 },
          { name: 'StartupXYZ', asignados: 4, capacidad: 6 }
        ],
        pieData: [
          { name: 'Tecnología', value: 35, color: '#3b82f6' },
          { name: 'Diseño', value: 20, color: '#8b5cf6' },
          { name: 'Marketing', value: 25, color: '#f59e0b' },
          { name: 'Consultoría', value: 20, color: '#10b981' }
        ]
      },
      'documentacion': {
        title: 'Reporte de Documentación Estudiantil',
        summary: {
          totalDocumentos: 234,
          documentosCompletos: 189,
          documentosPendientes: 45,
          estudiantesConDocumentos: 67
        },
        chartData: [
          { name: 'Enero', documentos: 35, completados: 28 },
          { name: 'Febrero', documentos: 42, completados: 35 },
          { name: 'Marzo', documentos: 38, completados: 32 },
          { name: 'Abril', documentos: 45, completados: 38 },
          { name: 'Mayo', documentos: 40, completados: 34 },
          { name: 'Junio', documentos: 34, completados: 22 }
        ],
        pieData: [
          { name: 'CV', value: 67, color: '#3b82f6' },
          { name: 'Carta Recomendación', value: 45, color: '#10b981' },
          { name: 'Certificados', value: 56, color: '#f59e0b' },
          { name: 'Formularios', value: 66, color: '#8b5cf6' }
        ]
      }
    }

    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return mockData[reporteType as keyof typeof mockData] || null
  }
}
