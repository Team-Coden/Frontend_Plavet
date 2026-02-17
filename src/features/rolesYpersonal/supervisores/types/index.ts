export type SupervisorStatus = "activo" | "inactivo" | "pendiente";

export interface Supervisor {
  id: number;
  nombre: string;
  apellido: string;
  id_contacto: number;
  fecha_creacion: string;
  id_centro_trabajo: number | null;
  estado: SupervisorStatus;
  deletedAt?: string | null;
  // Campos adicionales que podrían ser útiles
  nombre_contacto?: string;
  nombre_centro?: string;
}

export interface SupervisorFormData {
  nombre: string;
  apellido: string;
  id_contacto: string;
  id_centro_trabajo?: string | null;
  estado: SupervisorStatus;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
