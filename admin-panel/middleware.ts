import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("token cxxxxx", token);
  const { pathname } = req.nextUrl;

  // Root route logic
  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/quizzes", req.url));
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Protect dashboard routes
  if (!token && pathname.startsWith("/quizzes")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Forward token to backend APIs
  const requestHeaders = new Headers(req.headers);

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/", "/quizzes/:path*"],
};
