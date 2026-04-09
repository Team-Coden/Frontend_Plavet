import { apiClient } from "../../../../lib/api";
import type { ApiResponse, PaginatedResponse } from "../../../../lib/api";
import type { Supervisor, SupervisorFormData } from "../types";

// Adaptador para transformar la entidad del backend a la interfaz del frontend
const mapSupervisor = (backendData: any): Supervisor => {
  return {
    id: backendData.id ? String(backendData.id) : Date.now().toString(),
    nombre: backendData.nombre || "",
    apellido: backendData.apellido || "",
    email: backendData.contacto?.email || "",
    telefono: backendData.contacto?.telefono || "",
    id_centro_trabajo: backendData.centro_trabajo?.id || backendData.id_centro_trabajo || 0,
    nombre_centro: backendData.centro_trabajo?.nombre || "No asignado",
    estado: backendData.estado === "Activo" ? "activo" : "inactivo",
    fecha_contratacion: backendData.fecha_creacion 
      ? new Date(backendData.fecha_creacion).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0],
  };
};

export const supervisoresService = {
  getAll: async (params?: {
    search?: string;
    estado?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<Supervisor>> => {
    
    const queryParams: Record<string, string | number | boolean> = {
      page: params?.page || 1,
      pageSize: params?.pageSize || 10,
    };
    if (params?.search) queryParams.search = params.search;
    
    // Backend usa Activo/Inactivo
    if (params?.estado && params.estado !== 'todos') {
      queryParams.estado = params.estado === 'activo' ? 'Activo' : 'Inactivo';
    }

    const response = await apiClient.get<PaginatedResponse<any>>("/api/tutores-institucionales", queryParams);
    
    return {
      ...response,
      data: response.data.map(mapSupervisor),
    };
  },

  getById: async (id: string | number): Promise<Supervisor> => {
    const response = await apiClient.get<ApiResponse<any>>(`/api/tutores-institucionales/${id}`);
    return mapSupervisor(response.data);
  },

  create: async (data: SupervisorFormData): Promise<Supervisor> => {
    const backendPayload = {
      ...data,
      id_usuario: 1, // Enviaremos un usuario hardcode o lo quitará el backend
      correo: data.email,
      idCentroTrabajo: data.id_centro_trabajo
    };
    const response = await apiClient.post<ApiResponse<any>>("/api/tutores-institucionales", backendPayload);
    return mapSupervisor(response.data);
  },

  update: async (id: string | number, data: Partial<SupervisorFormData>): Promise<Supervisor> => {
    const backendPayload = {
      ...data,
      correo: data.email,
      idCentroTrabajo: data.id_centro_trabajo
    };
    const response = await apiClient.put<ApiResponse<any>>(`/api/tutores-institucionales/${id}`, backendPayload);
    return mapSupervisor(response.data);
  },

  delete: async (id: string | number): Promise<void> => {
    await apiClient.delete(`/api/tutores-institucionales/${id}`);
  },

  restore: async (id: string | number): Promise<Supervisor> => {
    const response = await apiClient.post<ApiResponse<any>>(`/api/tutores-institucionales/${id}/restore`, {});
    return mapSupervisor(response.data);
  },

  permanentDelete: async (id: string | number): Promise<void> => {
    await apiClient.delete(`/api/tutores-institucionales/${id}/permanent`);
  },

  exportCsv: async (params?: { search?: string; estado?: string }): Promise<Blob> => {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append("search", params.search);
    if (params?.estado && params.estado !== 'todos') {
      queryParams.append("estado", params.estado === 'activo' ? 'Activo' : 'Inactivo');
    }

    const token = localStorage.getItem("accessToken");
    const response = await fetch(`${import.meta.env.VITE_API_URL || "https://backend-check-in-gik5.onrender.com"}/api/tutores-institucionales/export?${queryParams}`, {
      method: "GET",
      headers: {
        Accept: "text/csv",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.blob();
  }
};
