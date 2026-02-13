import type { Document, DocumentFormData, DocumentFilters, DocumentStatus } from '../types'

// Mock data
let MOCK_DOCUMENTS: Document[] = [
  {
    id: "1",
    name: "Cédula",
    type: "cedula",
    uploadDate: "2024-01-15",
    status: "pendiente",
    size: "0.9 MB",
    uploadedBy: "Juan Pérez",
    description: "Documento de identificación"
  },
  {
    id: "2",
    name: "Curriculum Vitae",
    type: "cv",
    uploadDate: "2024-01-15",
    status: "pendiente",
    size: "0.4 MB",
    uploadedBy: "Juan Pérez",
    description: "CV actualizado"
  },
  {
    id: "3",
    name: "Anexo IV",
    type: "anexo",
    uploadDate: "2024-01-16",
    status: "aprobado",
    size: "1.1 MB",
    uploadedBy: "Juan Pérez",
    description: "Anexo IV firmado"
  },
  {
    id: "4",
    name: "Anexo V",
    type: "anexo",
    uploadDate: "2024-01-16",
    status: "pendiente",
    size: "1.0 MB",
    uploadedBy: "Juan Pérez",
    description: "Anexo V"
  },
  {
    id: "5",
    name: "Acta de nacimiento",
    type: "acta",
    uploadDate: "2024-01-17",
    status: "rechazado",
    size: "1.6 MB",
    uploadedBy: "Juan Pérez",
    description: "Acta de nacimiento"
  },
  {
    id: "6",
    name: "Cédula de Padres",
    type: "cedula",
    uploadDate: "2024-01-17",
    status: "aprobado",
    size: "1.3 MB",
    uploadedBy: "Juan Pérez",
    description: "Documento de padres"
  },
  {
    id: "7",
    name: "Tarjeta de Vacunación",
    type: "tarjeta",
    uploadDate: "2024-01-18",
    status: "pendiente",
    size: "0.7 MB",
    uploadedBy: "Juan Pérez",
    description: "Tarjeta de vacunación"
  }
]

export class DocumentacionService {
  static async getDocuments(filters: DocumentFilters): Promise<Document[]> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let filtered = MOCK_DOCUMENTS

    // Filtrar por término de búsqueda
    if (filters.searchTerm) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        doc.uploadedBy.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
    }

    // Filtrar por estado
    if (filters.statusFilter !== "all") {
      filtered = filtered.filter(doc => doc.status === filters.statusFilter)
    }

    // Filtrar por tipo
    if (filters.typeFilter) {
      filtered = filtered.filter(doc => 
        doc.type.toLowerCase().includes(filters.typeFilter.toLowerCase())
      )
    }

    // Filtrar por fecha
    if (filters.dateFilter) {
      filtered = filtered.filter(doc => 
        doc.uploadDate.includes(filters.dateFilter)
      )
    }

    return filtered
  }

  static async updateDocumentStatus(documentId: string, status: DocumentStatus): Promise<Document> {
    await new Promise(resolve => setTimeout(resolve, 250))

    const idx = MOCK_DOCUMENTS.findIndex(d => d.id === documentId)
    if (idx === -1) {
      throw new Error("Documento no encontrado")
    }

    const updated: Document = { ...MOCK_DOCUMENTS[idx], status }
    MOCK_DOCUMENTS = [...MOCK_DOCUMENTS.slice(0, idx), updated, ...MOCK_DOCUMENTS.slice(idx + 1)]
    return updated
  }

  static async uploadDocument(formData: DocumentFormData): Promise<Document> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newDocument: Document = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      uploadDate: new Date().toISOString().split('T')[0],
      status: "pendiente",
      size: formData.file ? `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB` : "0 MB",
      uploadedBy: "Usuario Actual",
      description: formData.description
    }

    // En una app real, aquí se haría el POST a la API
    console.log("[v0] Subiendo documento:", newDocument)

    MOCK_DOCUMENTS = [newDocument, ...MOCK_DOCUMENTS]
    
    return newDocument
  }

  static async deleteDocument(documentId: string): Promise<void> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    console.log("[v0] Eliminando documento:", documentId)
    
    // En una app real, aquí se haría DELETE a la API
    // DELETE /api/documents/${documentId}
  }

  static async downloadDocument(documentId: string): Promise<void> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    console.log("[v0] Descargando documento:", documentId)
    
    // En una app real, aquí se haría GET a la API
    // GET /api/documents/${documentId}/download
  }

  static getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case "aprobado":
        return { className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100", text: "Aprobado", icon: "✓" }
      case "pendiente":
        return { className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100", text: "Pendiente", icon: "⏰" }
      case "rechazado":
        return { className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100", text: "Rechazado", icon: "✗" }
      default:
        return { className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100", text: "Desconocido", icon: "?" }
    }
  }
}
