"use client";

import { useRouter } from "next/navigation";
import { useAppSelector } from "../../store/hooks";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     router.push("/login");
  //   }
  // }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  // if (!user) {
  //   return null;
  // }

  return <>{children}</>;
}
