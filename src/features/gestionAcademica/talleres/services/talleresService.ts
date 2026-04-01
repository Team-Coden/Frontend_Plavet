// ==========================================
// Servicio para el módulo de Talleres
// Conecta con: /api/talleres
// ==========================================

import { apiClient } from "../../../../lib/api";
import type { PaginatedResponse, ApiResponse } from "../../../../lib/api";
import type { Taller, CreateTallerData, TallerQueryParams } from "../types";

export const talleresService = {
  /**
   * Obtener todos los talleres con filtros y paginación
   */
  getAll: async (params?: TallerQueryParams): Promise<PaginatedResponse<Taller>> => {
  const queryParams: Record<string, string | number | boolean> = {
    estado: '',   
    page: params?.page ?? 1,
    pageSize: params?.pageSize ?? 15,
  };

  if (params?.search) queryParams.search = params.search;
  if (params?.estado && params.estado == "activo") queryParams.estado = params.estado;

  return apiClient.get<PaginatedResponse<Taller>>("/api/talleres", queryParams);
},
  /**
   * Obtener un taller por ID
   */
  getById: async (id: number): Promise<ApiResponse<Taller>> => {
    return apiClient.get<ApiResponse<Taller>>(`/api/talleres/${id}`);
  },

  /**
   * Crear un nuevo taller
   */
  create: async (data: CreateTallerData): Promise<ApiResponse<Taller>> => {
    return apiClient.post<ApiResponse<Taller>>("/api/talleres", data);
  },

  /**
   * Actualizar un taller existente
   */
  update: async (id: number, data: Partial<CreateTallerData>): Promise<ApiResponse<Taller>> => {
    return apiClient.put<ApiResponse<Taller>>(`/api/talleres/${id}`, data);
  },

  /**
   * Eliminar un taller
   */
  delete: async (id: number): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(`/api/talleres/${id}`);
  },
};
