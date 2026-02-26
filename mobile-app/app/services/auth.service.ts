// services/auth.service.ts
import { authApi } from "../api/auth.api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  country: string;
  password: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await authApi.login(credentials);
    console.log("Auth Service - Login Response:", JSON.stringify(response));
    return response;
  },

  register: async (data: RegisterData) => {
    const response = await authApi.register(data);
    return response.data;
  },

  getProfile: async () => {
    const response = await authApi.getProfile();
    return response.data;
  },

  logout: async () => {
    // clear token from storage
  },
};
