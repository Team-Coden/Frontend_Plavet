import { apiClient } from "../../../lib/api";

export interface LoginCredentials {
  cedula: string;
  password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  id_rol: number;
  rol: string;
  estado: string;
  tenant: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return apiClient.post<LoginResponse>("/api/auth/login", credentials);
  },

  logout: async (): Promise<void> => {
    return apiClient.post<void>("/api/auth/logout", {});
  },
};
