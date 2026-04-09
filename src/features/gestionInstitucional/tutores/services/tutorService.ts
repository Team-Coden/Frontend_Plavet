import type { Tutor, CreateTutorData, TutorStats, ApiResponse, PaginatedResponse } from "../types";
import { apiClient } from "../../../../lib/api";

// Adaptador para transformar la entidad del backend a la interfaz del frontend
const mapTutor = (backendData: any): Tutor => {
  return {
    id: backendData.id ? String(backendData.id) : Date.now().toString(),
    nombre: backendData.nombre || "",
    apellido: backendData.apellido || "",
    email: backendData.contacto?.email || "",
    telefono: backendData.contacto?.telefono || "",
    especialidadTecnica: backendData.taller?.nombre || String(backendData.id_taller || "No asignada"),
    areaAsignada: backendData.taller?.nombre || String(backendData.id_taller || "No asignada"),
    status: backendData.estado === "Activo" ? "active" : backendData.estado === "Inactivo" ? "deleted" : "pending",
    fechaContratacion: backendData.fecha_creacion 
      ? new Date(backendData.fecha_creacion).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0],
  };
};

export const tutorService = {
  getTutoresPaginated: async (
    page: number = 1,
    pageSize: number = 10,
    filters?: { search?: string; status?: string }
  ): Promise<PaginatedResponse<Tutor>> => {
    // Convert status to backend "estado" equivalent if needed (active -> Activo, deleted -> Inactivo)
    let estadoParam = undefined;
    if (filters?.status && filters.status !== 'todos') {
      estadoParam = filters.status === 'active' ? 'Activo' : filters.status === 'deleted' ? 'Inactivo' : 'Pendiente';
    }

    const queryParams: Record<string, string | number | boolean> = {
      page,
      pageSize,
    };
    if (filters?.search) queryParams.search = filters.search;
    if (estadoParam) queryParams.estado = estadoParam;

    const response = await apiClient.get<PaginatedResponse<any>>("/api/tutores", queryParams);
    
    return {
      ...response,
      data: response.data.map(mapTutor),
    };
  },

  getTutorById: async (id: string): Promise<Tutor> => {
    const response = await apiClient.get<ApiResponse<any>>(`/api/tutores/${id}`);
    return mapTutor(response.data);
  },

  createTutor: async (data: CreateTutorData): Promise<Tutor> => {
    // Al backend se le puede mandar aliases. El backend ya acepta 'correo', 'areaAsignada', 'especialidadTecnica'
    const backendPayload = {
      ...data,
      id_usuario: 1, // Usuario por defecto/fijo hasta que Auth esté inyectado
      correo: data.email,
    };
    
    const response = await apiClient.post<ApiResponse<any>>("/api/tutores", backendPayload);
    return mapTutor(response.data);
  },

  updateTutor: async (id: string, data: Partial<CreateTutorData>): Promise<Tutor> => {
    const backendPayload = {
      ...data,
      correo: data.email,
    };
    const response = await apiClient.put<ApiResponse<any>>(`/api/tutores/${id}`, backendPayload);
    return mapTutor(response.data);
  },

  deleteTutor: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/tutores/${id}`);
  },

  restoreTutor: async (id: string): Promise<Tutor> => {
    const response = await apiClient.post<ApiResponse<any>>(`/api/tutores/${id}/restore`, {});
    return mapTutor(response.data);
  },

  permanentlyDeleteTutor: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/tutores/${id}/permanent`);
  },

  getTutoresStats: async (): Promise<TutorStats> => {
    const response = await apiClient.get<any>("/api/tutores/stats");
    return {
      total: response.data?.total || 0,
      activos: 0,
      pendientes: 0,
      inhabilitados: 0,
    };
  },

  exportTutoresToCSV: async (filters?: { status?: string }): Promise<Blob> => {
    let estadoParam = undefined;
    if (filters?.status && filters.status !== 'todos') {
      estadoParam = filters.status === 'active' ? 'Activo' : filters.status === 'deleted' ? 'Inactivo' : 'Pendiente';
    }
    const params = new URLSearchParams();
    if (estadoParam) params.append("estado", estadoParam);

    const token = localStorage.getItem("accessToken");
    const response = await fetch(`https://backend-check-in-gik5.onrender.com/api/tutores/export?${params}`, {
      method: "GET",
      headers: {
        Accept: "text/csv",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return response.blob();
  }
};
