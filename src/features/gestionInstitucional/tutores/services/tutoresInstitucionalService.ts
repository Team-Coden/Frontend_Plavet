// ==========================================
// Servicio para el módulo de Tutores Institucionales (gestionInstitucional)
// Conecta con: /api/tutores-institucionales
// ==========================================

import { apiClient } from "../../../../lib/api";
import type { ApiResponse, PaginatedResponse } from "../../../../lib/api";

export interface TutorInstitucional {
  id: number;
  nombre: string;
  cedula: string;
  email: string;
  telefono?: string;
  centroDeTrabajo: string;
  plazaId?: number;
  estado: "Activo" | "Inactivo";
}

export type CreateTutorInstitucionalData = Omit<TutorInstitucional, "id">;

export const tutoresInstitucionalService = {
  getAll: async (params?: {
    search?: string;
    estado?: string;
    centroDeTrabajo?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<TutorInstitucional>> => {
    return apiClient.get<PaginatedResponse<TutorInstitucional>>("/api/tutores-institucionales", params as Record<string, string | number | boolean>);
  },

  getById: async (id: number): Promise<ApiResponse<TutorInstitucional>> => {
    return apiClient.get<ApiResponse<TutorInstitucional>>(`/api/tutores-institucionales/${id}`);
  },

  create: async (data: CreateTutorInstitucionalData): Promise<ApiResponse<TutorInstitucional>> => {
    return apiClient.post<ApiResponse<TutorInstitucional>>("/api/tutores-institucionales", data);
  },

  update: async (id: number, data: Partial<CreateTutorInstitucionalData>): Promise<ApiResponse<TutorInstitucional>> => {
    return apiClient.put<ApiResponse<TutorInstitucional>>(`/api/tutores-institucionales/${id}`, data);
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(`/api/tutores-institucionales/${id}`);
  },
};
