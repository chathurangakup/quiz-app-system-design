"use client";

import { Calendar, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const mockRevenueData = [
  { month: "Jan", revenue: 12500, users: 4200 },
  { month: "Feb", revenue: 18900, users: 5100 },
  { month: "Mar", revenue: 21500, users: 6100 },
  { month: "Apr", revenue: 24800, users: 7200 },
  { month: "May", revenue: 28700, users: 8100 },
  { month: "Jun", revenue: 32400, users: 9200 },
  { month: "Jul", revenue: 36500, users: 10500 },
  { month: "Aug", revenue: 39800, users: 11200 },
  { month: "Sep", revenue: 43200, users: 12400 },
  { month: "Oct", revenue: 47800, users: 13500 },
  { month: "Nov", revenue: 51200, users: 14200 },
  { month: "Dec", revenue: 58900, users: 15600 },
];

const timeRanges = [
  { label: "1M", value: "1m" },
  { label: "6M", value: "6m" },
  { label: "1Y", value: "1y" },
  { label: "All", value: "all" },
];

export default function RevenueChart() {
  const [selectedRange, setSelectedRange] = useState("1y");
  const [chartType, setChartType] = useState("area");

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-white p-4 shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm">
              <span className="text-gray-600">Revenue: </span>
              <span className="font-medium text-blue-600">
                ${payload[0].value.toLocaleString()}
              </span>
            </p>
            <p className="text-sm">
              <span className="text-gray-600">Users: </span>
              <span className="font-medium text-green-600">
                {payload[1].value.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Revenue Overview
            </h3>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            Total revenue and user growth
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div className="flex rounded-lg border">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setSelectedRange(range.value)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    selectedRange === range.value
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockRevenueData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f3f4f6"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#colorRevenue)"
              name="Revenue"
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#10B981"
              strokeWidth={2}
              fill="url(#colorUsers)"
              name="Users"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex items-center justify-center space-x-8">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-blue-600"></div>
          <span className="ml-2 text-sm font-medium text-gray-700">
            Revenue
          </span>
          <span className="ml-2 text-sm text-gray-600">+24.5%</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-green-600"></div>
          <span className="ml-2 text-sm font-medium text-gray-700">
            Active Users
          </span>
          <span className="ml-2 text-sm text-gray-600">+18.2%</span>
        </div>
      </div>
    </div>
  );
}
