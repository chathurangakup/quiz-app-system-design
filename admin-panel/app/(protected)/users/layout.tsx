import ProtectedRoute from "@/app/components/layout/ProtectedRoute";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 pl-64">
          <Header />
          <main className="min-h-[calc(100vh-4rem)] bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
