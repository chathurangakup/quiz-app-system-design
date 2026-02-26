// services/api.ts
import axios from "axios";
import { getToken } from "../utils/storage";

const api = axios.create({
  baseURL: "http://192.168.8.176:4000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token automatically
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 🚫 Handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized - token expired or invalid");
      // optional: logout, clear storage, redirect
    }
    return Promise.reject(error);
  },
);

export default api;
