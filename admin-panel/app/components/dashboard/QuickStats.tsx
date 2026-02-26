"use client";

import { Clock, DollarSign, Target, Users } from "lucide-react";

interface QuickStatsProps {
  activeUsers: number;
  completionRate: number;
  avgTime: string;
  avgRevenue: number;
  loading?: boolean;
}

export default function QuickStats({
  activeUsers,
  completionRate,
  avgTime,
  avgRevenue,
  loading = false,
}: QuickStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg border bg-white p-4">
            <div className="animate-pulse">
              <div className="h-4 w-20 rounded bg-gray-200"></div>
              <div className="mt-2 h-6 w-12 rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const stats = [
    {
      label: "Active Users",
      value: activeUsers.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Avg. Time",
      value: avgTime,
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Avg. Revenue",
      value: `$${avgRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
            <div className={`rounded-lg p-2 ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
