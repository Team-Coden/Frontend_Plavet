export interface Excuse {
  id: string
  pasantia: string
  estudiante: string
  tutor: string
  justificacion: string
  certificado: string
  fecha: string
  estado: "Pendiente" | "Aprobada" | "Rechazada"
}

export interface ExcuseFormData {
  pasantia: string
  estudiante: string
  tutor: string
  justificacion: string
}

export interface ExcuseFilters {
  searchTerm: string
  filterEstado: string
}
