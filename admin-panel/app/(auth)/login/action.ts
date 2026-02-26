"use server";

import { cookies } from "next/headers";
import api from "../../services/api";
import { LoginRequest, LoginResponse } from "../../types/admin.types";

export async function loginAction(data: LoginRequest) {
  const response = await api.post<LoginResponse>("/admin/admin-login", data);

  const token = response.data.token;
  console.log("Received token 1:", token);

  try {
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: false, // ❗ must be false for HTTP
      sameSite: "lax", // ❗ best for local dev
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    console.log("Token set in cookie successfully");
  } catch (error) {
    console.error("Failed to set cookie:", error);
  }

  return response.data;
}

export async function logoutAction() {
  const cookieStore = cookies();

  (await cookieStore).delete("token");
}
