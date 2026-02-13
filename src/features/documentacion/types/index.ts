export type DocumentStatus = "pendiente" | "aprobado" | "rechazado"

export interface Document {
  id: string
  name: string
  type: string
  uploadDate: string
  status: DocumentStatus
  size: string
  uploadedBy: string
  description?: string
}

export interface DocumentFilters {
  searchTerm: string
  statusFilter: DocumentStatus | "all"
  typeFilter: string
  dateFilter: string
}

export interface DocumentFormData {
  name: string
  type: string
  description: string
  file: File | null
}
