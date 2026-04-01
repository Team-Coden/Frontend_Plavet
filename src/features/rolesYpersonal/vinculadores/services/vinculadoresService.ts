// ==========================================
// Servicio para el módulo de Vinculadores (rolesYpersonal)
// Conecta con: /api/vinculadores
// ==========================================

import { apiClient } from "../../../../lib/api";
import type { ApiResponse, PaginatedResponse } from "../../../../lib/api";

export interface Vinculador {
  id: number;
  nombre: string;
  cedula: string;
  email: string;
  telefono?: string;
  zona?: string;
  estado: "Activo" | "Inactivo";
}

export type CreateVinculadorData = Omit<Vinculador, "id">;

export const vinculadoresService = {
  getAll: async (params?: {
    search?: string;
    estado?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<Vinculador>> => {
    return apiClient.get<PaginatedResponse<Vinculador>>("/api/vinculadores", params as Record<string, string | number | boolean>);
  },

  getById: async (id: number): Promise<ApiResponse<Vinculador>> => {
    return apiClient.get<ApiResponse<Vinculador>>(`/api/vinculadores/${id}`);
  },

  create: async (data: CreateVinculadorData): Promise<ApiResponse<Vinculador>> => {
    return apiClient.post<ApiResponse<Vinculador>>("/api/vinculadores", data);
  },

  update: async (id: number, data: Partial<CreateVinculadorData>): Promise<ApiResponse<Vinculador>> => {
    return apiClient.put<ApiResponse<Vinculador>>(`/api/vinculadores/${id}`, data);
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(`/api/vinculadores/${id}`);
  },
};
