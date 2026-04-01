// ==========================================
// Servicio para el módulo de Autenticación
// Conecta con: /api/auth
// ==========================================

import { apiClient } from "../../../lib/api";
import type { ApiResponse } from "../../../lib/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
    return apiClient.post<ApiResponse<LoginResponse>>("/api/auth/login", credentials);
  },

  logout: async (): Promise<ApiResponse<void>> => {
    return apiClient.post<ApiResponse<void>>("/api/auth/logout", {});
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<AuthTokens>> => {
    return apiClient.post<ApiResponse<AuthTokens>>("/api/auth/refresh", { refreshToken });
  },

  me: async (): Promise<ApiResponse<AuthUser>> => {
    return apiClient.get<ApiResponse<AuthUser>>("/api/auth/me");
  },
};
