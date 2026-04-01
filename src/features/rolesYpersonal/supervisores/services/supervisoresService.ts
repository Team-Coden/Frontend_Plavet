// ==========================================
// Servicio para el módulo de Supervisores (rolesYpersonal)
// Conecta con: /api/supervisores
// ==========================================

import { apiClient } from "../../../../lib/api";
import type { ApiResponse, PaginatedResponse } from "../../../../lib/api";

export interface Supervisor {
  id: number;
  nombre: string;
  cedula: string;
  email: string;
  telefono?: string;
  departamento?: string;
  estado: "Activo" | "Inactivo";
}

export type CreateSupervisorData = Omit<Supervisor, "id">;

export const supervisoresService = {
  getAll: async (params?: {
    search?: string;
    estado?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<Supervisor>> => {
    return apiClient.get<PaginatedResponse<Supervisor>>("/api/supervisores", params as Record<string, string | number | boolean>);
  },

  getById: async (id: number): Promise<ApiResponse<Supervisor>> => {
    return apiClient.get<ApiResponse<Supervisor>>(`/api/supervisores/${id}`);
  },

  create: async (data: CreateSupervisorData): Promise<ApiResponse<Supervisor>> => {
    return apiClient.post<ApiResponse<Supervisor>>("/api/supervisores", data);
  },

  update: async (id: number, data: Partial<CreateSupervisorData>): Promise<ApiResponse<Supervisor>> => {
    return apiClient.put<ApiResponse<Supervisor>>(`/api/supervisores/${id}`, data);
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(`/api/supervisores/${id}`);
  },
};
