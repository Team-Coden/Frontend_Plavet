import { apiClient } from "../../../../lib/api";
import type { ApiResponse, PaginatedResponse } from "../../../../lib/api";
import type { Plaza, CreatePlazaData, PlazaQueryParams } from "../types";

// Adaptador backend → frontend
const mapPlaza = (b: any): Plaza => ({
  id: b.id,
  nombre: b.taller?.nombre || b.titulo || "Sin nombre",
  centro: b.centro_trabajo?.nombre || "Sin centro",
  titulo: b.taller?.nombre || b.titulo || "",
  genero: b.genero === "Ambos" ? "Indistinto" : (b.genero as any) || "Indistinto",
  estado: b.estado === "Activa" ? "Activa" : b.estado === "Ocupada" ? "Ocupada" : "Inhabilitada",
  descripcion: b.observacion || "",
  fechaCreacion: b.fecha_creacion
    ? new Date(b.fecha_creacion).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0],
  taller: b.taller?.nombre || "",
});

export async function fetchPlazas(params: PlazaQueryParams = {}): Promise<Plaza[]> {
  const query: Record<string, string | number | boolean> = {
    page: params.page || 1,
    pageSize: params.pageSize || 50,
  };
  if (params.search) query.search = params.search;
  if (params.estado && params.estado !== "todos") query.estado = params.estado;
  if (params.taller && params.taller !== "todos") query.id_taller = params.taller;

  const response = await apiClient.get<PaginatedResponse<any>>("/api/plazas", query);
  return response.data.map(mapPlaza);
}

export async function fetchPlazaById(id: number): Promise<Plaza> {
  const response = await apiClient.get<ApiResponse<any>>(`/api/plazas/${id}`);
  return mapPlaza(response.data);
}

export async function createPlaza(data: CreatePlazaData): Promise<Plaza> {
  const response = await apiClient.post<ApiResponse<any>>("/api/plazas", {
    id_taller: data.taller,
    genero: data.genero === "Indistinto" ? "Ambos" : data.genero,
    estado: data.estado,
    observacion: data.descripcion,
  });
  return mapPlaza(response.data);
}

export async function updatePlazaApi(plaza: Plaza): Promise<Plaza> {
  const response = await apiClient.put<ApiResponse<any>>(`/api/plazas/${plaza.id}`, {
    genero: plaza.genero === "Indistinto" ? "Ambos" : plaza.genero,
    estado: plaza.estado,
    observacion: plaza.descripcion,
  });
  return mapPlaza(response.data);
}

export async function deletePlazaApi(id: number): Promise<void> {
  await apiClient.delete(`/api/plazas/${id}`);
}
