// store/admin/admin.types.ts

export type AdminRole = "SUPER_ADMIN" | "ADMIN";

export interface Admin {
  id: string;
  email: string;
  role: AdminRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  admin: Admin;
}

export interface AdminAuthState {
  admin: Admin | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}
