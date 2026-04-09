import { apiClient } from "../../../../lib/api";
import type { ApiResponse, PaginatedResponse } from "../../../../lib/api";
import type { Vinculador, VinculadorFormData } from "../types";

// Adaptador para transformar la entidad del backend a la interfaz del frontend
const mapVinculador = (backendData: any): Vinculador => {
  return {
    id: backendData.id || Date.now(),
    nombre: backendData.nombre || "",
    apellido: backendData.apellido || "",
    email: backendData.contacto?.email || "",
    telefono: backendData.contacto?.telefono || "",
    id_centro_trabajo: backendData.centro_trabajo?.id || backendData.id_centro_trabajo || 0,
    nombre_centro: backendData.centro_trabajo?.nombre || "No asignado",
    estado: backendData.estado === "Activo" ? "activo" : "inactivo",
    id_contacto: backendData.contacto?.id || backendData.id_contacto || 0,
    nombre_contacto: backendData.contacto?.nombre || "",
    fecha_creacion: backendData.fecha_creacion 
      ? new Date(backendData.fecha_creacion).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0],
  };
};

export const vinculadoresService = {
  getAll: async (params?: {
    search?: string;
    estado?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<Vinculador>> => {
    const queryParams: Record<string, string | number | boolean> = {
      page: params?.page || 1,
      pageSize: params?.pageSize || 10,
    };
    if (params?.search) queryParams.search = params.search;
    
    // Backend usa Activo/Inactivo
    if (params?.estado && params.estado !== 'todos') {
      queryParams.estado = params.estado === 'activo' ? 'Activo' : 'Inactivo';
    }

    const response = await apiClient.get<PaginatedResponse<any>>("/api/vinculadores", queryParams);
    
    return {
      ...response,
      data: response.data.map(mapVinculador),
    };
  },

  getById: async (id: number): Promise<Vinculador> => {
    const response = await apiClient.get<ApiResponse<any>>(`/api/vinculadores/${id}`);
    return mapVinculador(response.data);
  },

  create: async (data: VinculadorFormData): Promise<Vinculador> => {
    const backendPayload = {
      ...data,
      id_usuario: 1, // Usuario hardcode o lo quitará el backend
      correo: data.email,
    };
    const response = await apiClient.post<ApiResponse<any>>("/api/vinculadores", backendPayload);
    return mapVinculador(response.data);
  },

  update: async (id: number, data: Partial<VinculadorFormData>): Promise<Vinculador> => {
    const backendPayload = {
      ...data,
      correo: data.email,
    };
    const response = await apiClient.put<ApiResponse<any>>(`/api/vinculadores/${id}`, backendPayload);
    return mapVinculador(response.data);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/vinculadores/${id}`);
  },

  restore: async (id: number): Promise<Vinculador> => {
    const response = await apiClient.post<ApiResponse<any>>(`/api/vinculadores/${id}/restore`, {});
    return mapVinculador(response.data);
  },

  permanentDelete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/vinculadores/${id}/permanent`);
  },

  exportCsv: async (params?: { search?: string; estado?: string }): Promise<Blob> => {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append("search", params.search);
    if (params?.estado && params.estado !== 'todos') {
      queryParams.append("estado", params.estado === 'activo' ? 'Activo' : 'Inactivo');
    }

    const token = localStorage.getItem("accessToken");
    const response = await fetch(`https://backend-check-in-gik5.onrender.com/api/vinculadores/export?${queryParams}`, {
      method: "GET",
      headers: {
        Accept: "text/csv",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.blob();
  }
};
