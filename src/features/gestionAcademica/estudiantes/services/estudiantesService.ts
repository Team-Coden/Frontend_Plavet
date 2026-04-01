// ==========================================
// Servicio para el módulo de Estudiantes (gestionAcademica)
// Conecta con: /api/estudiantes
// ==========================================

import { apiClient } from "../../../../lib/api";
import type { ApiResponse, PaginatedResponse } from "../../../../lib/api";

export interface Estudiante {
  id: number;
  nombre: string;
  cedula: string;
  email: string;
  telefono?: string;
  tallerId: number;
  estado: "Activo" | "Inactivo" | "Graduado";
}

export type CreateEstudianteData = Omit<Estudiante, "id">;

export const estudiantesService = {
  getAll: async (params?: {
    search?: string;
    estado?: string;
    tallerId?: number;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<Estudiante>> => {
    return apiClient.get<PaginatedResponse<Estudiante>>("/api/estudiantes", params as Record<string, string | number | boolean>);
  },

  getById: async (id: number): Promise<ApiResponse<Estudiante>> => {
    return apiClient.get<ApiResponse<Estudiante>>(`/api/estudiantes/${id}`);
  },

  create: async (data: CreateEstudianteData): Promise<ApiResponse<Estudiante>> => {
    return apiClient.post<ApiResponse<Estudiante>>("/api/estudiantes", data);
  },

  update: async (id: number, data: Partial<CreateEstudianteData>): Promise<ApiResponse<Estudiante>> => {
    return apiClient.put<ApiResponse<Estudiante>>(`/api/estudiantes/${id}`, data);
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(`/api/estudiantes/${id}`);
  },
};
