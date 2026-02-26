import { LoginCredentials } from "../types";
import api from "./api";

export const authService = {
  login: (credentials: LoginCredentials) =>
    api.post("/auth/login", credentials),

  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
};
