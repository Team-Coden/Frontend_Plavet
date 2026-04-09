import type {
  Usuario,
  PaginatedResponse,
  UsuarioQueryParams,
} from "../types";

const API_BASE = "/api/users";

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem("token") ?? "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchUsuarios(
  params: UsuarioQueryParams = {}
): Promise<{ data: Usuario[]; total: number; totalPages: number }> {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(params.limit ?? 20));

  const res = await fetch(`${API_BASE}?${searchParams.toString()}`, {
    headers: { ...getAuthHeader() },
  });
  if (!res.ok) throw new Error("Error al obtener usuarios");

  const json: PaginatedResponse<Usuario> = await res.json();
  return {
    data: json.data,
    total: json.pagination.total,
    totalPages: json.pagination.totalPages,
  };
}

export async function fetchUsuarioById(id: number): Promise<Usuario> {
  const res = await fetch(`${API_BASE}/${id}`, {
    headers: { ...getAuthHeader() },
  });
  if (!res.ok) throw new Error("Usuario no encontrado");
  const json: { data: Usuario } = await res.json();
  return json.data;
}

export async function patchUsuarioRol(
  id: number,
  id_rol: number
): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}/role`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify({ id_rol }),
  });
  if (!res.ok) throw new Error("Error al cambiar rol");
}

export async function patchUsuarioEstado(
  id: number,
  estado: "Activo" | "Inactivo"
): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify({ estado }),
  });
  if (!res.ok) throw new Error("Error al cambiar estado");
}
