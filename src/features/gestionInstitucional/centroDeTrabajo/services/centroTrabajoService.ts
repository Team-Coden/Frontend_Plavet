import { apiClient } from "../../../../lib/api";
import type { ApiResponse, PaginatedResponse } from "../../../../lib/api";
import type { CentroTrabajo, CreateCentroData, CentroStats } from "../types";

// Adaptador backend → frontend
const mapCentro = (b: any): CentroTrabajo => ({
  id: String(b.id),
  name: b.nombre || "",
  location: b.direccion
    ? `${b.direccion.calle || ""} ${b.direccion.numero_residencia || ""}`.trim()
    : "",
  employees: 0,
  status: b.estado === "Activo" ? "active" : b.estado === "Inactivo" ? "deleted" : "pending",
  validated: b.validacion === "Validado",
  createdAt: b.fecha_creacion
    ? new Date(b.fecha_creacion).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0],
  id_contacto: b.id_contacto,
  id_direccion: b.id_direccion,
  restriccion_edad: b.restriccion_edad,
  id_usuario: b.id_usuario,
  validacion: b.validacion,
  fecha_creacion: b.fecha_creacion,
});

export const centroTrabajoService = {
  getAll: async (params?: {
    search?: string;
    estado?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<CentroTrabajo>> => {
    const query: Record<string, string | number | boolean> = {
      page: params?.page || 1,
      pageSize: params?.pageSize || 10,
    };
    if (params?.search) query.search = params.search;
    if (params?.estado && params.estado !== "todos") query.estado = params.estado;

    const response = await apiClient.get<PaginatedResponse<any>>("/api/centros-trabajo", query);
    return {
      ...response,
      data: response.data.map(mapCentro),
    };
  },

  getById: async (id: string | number): Promise<CentroTrabajo> => {
    const response = await apiClient.get<ApiResponse<any>>(`/api/centros-trabajo/${id}`);
    return mapCentro(response.data);
  },

  create: async (data: CreateCentroData): Promise<CentroTrabajo> => {
    const response = await apiClient.post<ApiResponse<any>>("/api/centros-trabajo", {
      nombre: data.name,
      direccion: data.location,
    });
    return mapCentro(response.data);
  },

  update: async (id: string | number, data: Partial<CreateCentroData>): Promise<CentroTrabajo> => {
    const payload: Record<string, any> = {};
    if (data.name) payload.nombre = data.name;
    if (data.location) payload.direccion = data.location;

    const response = await apiClient.patch<ApiResponse<any>>(`/api/centros-trabajo/${id}`, payload);
    return mapCentro(response.data);
  },

  delete: async (id: string | number): Promise<void> => {
    await apiClient.delete(`/api/centros-trabajo/${id}`);
  },

  getStats: async (): Promise<CentroStats> => {
    const response = await apiClient.get<PaginatedResponse<any>>("/api/centros-trabajo", {
      pageSize: 1,
    });
    return {
      total: response.pagination?.total || 0,
      activos: 0,
      validados: 0,
      pendientes: 0,
      archivados: 0,
    };
  },

  exportCsv: async (params?: { search?: string; estado?: string }): Promise<Blob> => {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.estado && params.estado !== "todos") query.set("estado", params.estado);

    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `https://backend-check-in-gik5.onrender.com/api/centros-trabajo/export?${query}`,
      {
        method: "GET",
        headers: {
          Accept: "text/csv",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    return response.blob();
  },
};

// Re-exported legacy functions for backward compatibility with existing hooks
export const getCentros = () =>
  centroTrabajoService.getAll({ pageSize: 100 }).then((r) => r.data);

export const getCentrosPaginated = (
  page: number,
  pageSize: number,
  filters?: { search?: string; status?: string }
) =>
  centroTrabajoService.getAll({
    page,
    pageSize,
    search: filters?.search,
    estado: filters?.status,
  });

export const getCentroById = (id: string) => centroTrabajoService.getById(id);

export const createCentro = (data: CreateCentroData) => centroTrabajoService.create(data);

export const updateCentro = (id: string, data: Partial<CentroTrabajo>) =>
  centroTrabajoService.update(id, { name: data.name, location: data.location });

export const deleteCentro = (id: string) => centroTrabajoService.delete(id);

export const restoreCentro = async (_id: string): Promise<CentroTrabajo> => {
  throw new Error("restore not implemented for centros-trabajo");
};

export const permanentlyDeleteCentro = async (_id: string): Promise<void> => {
  throw new Error("permanent delete not implemented for centros-trabajo");
};

export const getCentrosStats = () => centroTrabajoService.getStats();

export const exportCentrosToCSV = (filters?: { status?: string }) =>
  centroTrabajoService.exportCsv({ estado: filters?.status });

export const validateCentro = async (id: string): Promise<CentroTrabajo> => {
  const response = await apiClient.patch<ApiResponse<any>>(`/api/centros-trabajo/${id}`, {
    validacion: "Validado",
  });
  return mapCentro(response.data);
};
