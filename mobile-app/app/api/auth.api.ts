// api/auth.api.ts
import api from "../services/api";

export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),

  register: (data: {
    name: string;
    email: string;
    phone: string;
    country: string;
    password: string;
  }) => api.post("/auth/register", data),

  getProfile: () => api.get("/auth/user-details"), // token auto-attached
};
