"use client";

import { logoutAction } from "@/app/(auth)/login/action";
import {
  FileText,
  HelpCircle,
  LogOut,
  Settings,
  Shield,
  Users,
  Wallet,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "../../store/hooks";

const navItems = [
  // { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/quizzes", icon: FileText, label: "Quizzes" },
  { href: "/submitquizzes", icon: FileText, label: "Submit Quizzes" },
  { href: "/users", icon: Users, label: "Users" },

  { href: "/kyc", icon: Shield, label: "KYC" },
  { href: "/wallets", icon: Wallet, label: "Wallets" },
  // { href: "/withdrawals", icon: CreditCard, label: "Withdrawals" },
  // { href: "/admins", icon: Users, label: "Admins" },
  // { href: "/analytics", icon: BarChart3, label: "Analytics" },
];

const secondaryItems = [
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/help", icon: HelpCircle, label: "Help Center" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    // 1️⃣ Remove httpOnly cookie (SERVER)
    await logoutAction();
    // 1️⃣ Clear Redux (recommended: reset root state)
    dispatch({ type: "auth/logoutAll" });

    // 2️⃣ Clear browser storage
    localStorage.clear();
    sessionStorage.clear();

    // 3️⃣ Clear NON-HttpOnly cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
    });

    // 4️⃣ Redirect to login

    router.replace("/login");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-white">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4">
          {secondaryItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
