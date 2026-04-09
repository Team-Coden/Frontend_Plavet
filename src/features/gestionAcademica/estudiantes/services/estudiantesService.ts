import { apiClient } from "../../../../lib/api";
import type { ApiResponse, PaginatedResponse } from "../../../../lib/api";
import type { Estudiante, CreateEstudianteData, EstudianteQueryParams } from "../types";

const mapEstudiante = (backendData: any): Estudiante => {
  return {
    id: backendData.id || backendData.cedula || Date.now().toString(),
    cedula: backendData.id || backendData.cedula || "",
    nombre: backendData.nombre || "",
    apellido: backendData.apellido || "",
    email: backendData.contacto?.email || "",
    telefono: backendData.contacto?.telefono || "",
    genero: backendData.sexo === "M" ? "Masculino" : backendData.sexo === "F" ? "Femenino" : "Masculino",
    estado: backendData.estado || "Activo",
    carrera: backendData.taller?.nombre || "Informática",
    semestre: backendData.id_ciclo || 1,
    fechaIngreso: backendData.fecha_creacion
      ? new Date(backendData.fecha_creacion).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    promedio: 0,
    direccion: backendData.direccion
      ? `${backendData.direccion.calle} ${backendData.direccion.numero_residencia}`.trim()
      : "",
  };
};

export const estudiantesService = {
  getAll: async (params?: EstudianteQueryParams): Promise<PaginatedResponse<Estudiante>> => {
    const query = params ? (params as Record<string, string | number | boolean>) : undefined;
    const response = await apiClient.get<PaginatedResponse<any>>("/api/estudiantes", query);
    return {
      ...response,
      data: response.data.map(mapEstudiante),
    };
  },

  getById: async (id: string | number): Promise<ApiResponse<Estudiante>> => {
    const response = await apiClient.get<ApiResponse<any>>(`/api/estudiantes/${id}`);
    return {
      ...response,
      data: mapEstudiante(response.data),
    };
  },

  create: async (data: CreateEstudianteData): Promise<ApiResponse<Estudiante>> => {
    const backendPayload: Record<string, any> = {
      nombre: data.nombre,
      apellido: data.apellido,
      cedula: data.cedula,
      telefono: data.telefono,
      correo: data.email,
      genero: data.genero,
      direccion: data.direccion,
      id_usuario: 1,
    };

    if (data.fecha_nacimiento) backendPayload.fecha_nacimiento = data.fecha_nacimiento;
    // Solo se envía id_taller — nunca carrera (string) para evitar conflicto con el alias del backend
    if (data.id_taller) backendPayload.id_taller = data.id_taller;

    const response = await apiClient.post<ApiResponse<any>>("/api/estudiantes", backendPayload);
    return {
      ...response,
      data: mapEstudiante(response.data),
    };
  },

  update: async (id: string | number, data: Partial<CreateEstudianteData> & Partial<Estudiante>): Promise<ApiResponse<Estudiante>> => {
    const backendPayload: Record<string, any> = {};
    if (data.nombre) backendPayload.nombre = data.nombre;
    if (data.apellido) backendPayload.apellido = data.apellido;
    if (data.telefono) backendPayload.telefono = data.telefono;
    if (data.email) backendPayload.correo = data.email;
    if (data.genero) backendPayload.genero = data.genero;
    if (data.direccion) backendPayload.direccion = data.direccion;
    // Solo id_taller numérico — nunca 'carrera' como string (evita conflicto con alias backend)
    if (data.id_taller && typeof data.id_taller === 'number') {
      backendPayload.id_taller = data.id_taller;
    }
    if (data.fecha_nacimiento) backendPayload.fecha_nacimiento = data.fecha_nacimiento;

    const response = await apiClient.put<ApiResponse<any>>(`/api/estudiantes/${id}`, backendPayload);
    return {
      ...response,
      data: mapEstudiante(response.data),
    };
  },

  delete: async (id: string | number): Promise<ApiResponse<void>> => {
    return apiClient.delete<ApiResponse<void>>(`/api/estudiantes/${id}`);
  },
};