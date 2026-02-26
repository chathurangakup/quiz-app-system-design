import api from "./api";

export const usersService = {
  getAllUsers: () => api.get("/auth/users"),
};
