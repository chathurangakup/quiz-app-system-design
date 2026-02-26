import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
