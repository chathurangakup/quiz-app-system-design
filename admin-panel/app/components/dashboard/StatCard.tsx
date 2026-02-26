"use client";

import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  change: string;
  trend: "up" | "down";
  loading?: boolean;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  change,
  trend,
  loading = false,
}: StatCardProps) {
  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 rounded bg-gray-200"></div>
            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
          </div>
          <div className="mt-4">
            <div className="h-8 w-16 rounded bg-gray-200"></div>
            <div className="mt-2 h-4 w-20 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div
          className={`rounded-lg p-3 ${
            trend === "up" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <Icon
            className={`h-6 w-6 ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {trend === "up" ? (
          <TrendingUp className="mr-1 h-4 w-4 text-green-600" />
        ) : (
          <TrendingDown className="mr-1 h-4 w-4 text-red-600" />
        )}
        <span
          className={`text-sm font-medium ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {change} from last month
        </span>
      </div>
    </div>
  );
}
