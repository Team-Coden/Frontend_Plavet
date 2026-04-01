// ==========================================
// Servicio para el módulo de Tutores (gestionAcademica)
// Conecta con: /api/tutores
// ==========================================

import { apiClient } from "../../../../lib/api";
import type { ApiResponse, PaginatedResponse } from "../../../../lib/api";

export interface TutorAcademico {
  id: number;
  nombre: string;
  cedula: string;
  email: string;
  telefono?: string;
  especialidad: string;
  estado: "Activo" | "Inactivo";
}

export type CreateTutorAcademicoData = Omit<TutorAcademico, "id">;

export const tutoresAcademicoService = {
  getAll: async (params?: {
    search?: string;
    estado?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<TutorAcademico>> => {
    return apiClient.get<PaginatedResponse<TutorAcademico>>("/api/tutores-academicos", params as Record<string, string | number | boolean>);
  },

  getById: async (id: number): Promise<ApiResponse<TutorAcademico>> => {
    return apiClient.get<ApiResponse<TutorAcademico>>(`/api/tutores-academicos/${id}`);
  },

  create: async (data: CreateTutorAcademicoData): Promise<ApiResponse<TutorAcademico>> => {
    return apiClient.post<ApiResponse<TutorAcademico>>("/api/tutores-academicos", data);
  },

  update: async (id: number, data: Partial<CreateTutorAcademicoData>): Promise<ApiResponse<TutorAcademico>> => {
    return apiClient.put<ApiResponse<TutorAcademico>>(`/api/tutores-academicos/${id}`, data);
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(`/api/tutores-academicos/${id}`);
  },
};
