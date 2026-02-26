export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "moderator" | "support";
  avatar?: string;
  permissions?: string[];
  lastLogin?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface AuthError {
  message: string;
  code?: string;
  field?: string;
}

export interface TokenRefreshResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface VerifyEmailRequest {
  token: string;
}

// Role-based permission types
export type UserRole = "admin" | "moderator" | "support" | "user";

export interface Permission {
  id: string;
  name: string;
  description?: string;
}

export interface Role {
  id: string;
  name: UserRole;
  permissions: Permission[];
  description?: string;
}

// Session management
export interface Session {
  id: string;
  userId: string;
  device: string;
  browser: string;
  ipAddress: string;
  location?: string;
  lastActive: string;
  createdAt: string;
}

export interface LoginHistory {
  id: string;
  userId: string;
  device: string;
  browser: string;
  ipAddress: string;
  location?: string;
  status: "success" | "failed";
  reason?: string;
  timestamp: string;
}

// Two-factor authentication
export interface TwoFactorSetup {
  secret?: string;
  qrCode?: string;
  backupCodes?: string[];
  isEnabled: boolean;
}

export interface TwoFactorVerify {
  code: string;
}

export interface BackupCode {
  code: string;
  used: boolean;
  usedAt?: string;
}
