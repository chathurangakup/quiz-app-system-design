"use client";

import { useRouter } from "next/navigation";
import { useAppSelector } from "./store/hooks";

export default function HomePage() {
  const router = useRouter();
  const { isLoading } = useAppSelector((state) => state.auth);
  // useEffect(() => {
  //   if (!isLoading) {
  //     if (user) {
  //       router.push("/dashboard");
  //     } else {
  //       //router.push("/login");
  //     }
  //   }
  // }, [user, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // This page will redirect immediately, but we can show a landing page if needed
  // For now, showing a redirect message
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
