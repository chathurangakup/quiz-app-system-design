"use client";

import { format } from "date-fns";
import { Activity, ExternalLink } from "lucide-react";
import { Activity as ActivityType } from "../..//types";

interface RecentActivityProps {
  activities: ActivityType[];
  loading?: boolean;
}

export default function RecentActivity({
  activities,
  loading = false,
}: RecentActivityProps) {
  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-6 w-32 rounded bg-gray-200"></div>
          <div className="h-4 w-20 rounded bg-gray-200"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-48 rounded bg-gray-200"></div>
                  <div className="mt-2 h-3 w-32 rounded bg-gray-200"></div>
                </div>
                <div className="h-3 w-16 rounded bg-gray-200"></div>
              </div>
              <div className="mt-2 h-px bg-gray-100"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h3>
        </div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="py-8 text-center">
            <Activity className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2 text-gray-500">No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <span className="text-gray-600">•</span>
                    <p className="text-gray-600">{activity.action}</p>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <span className="truncate">{activity.ipAddress}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {format(new Date(activity.timestamp), "MMM d, HH:mm")}
                    </span>
                  </div>
                </div>
                <button className="ml-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <ExternalLink className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <div className="mt-4 h-px bg-gray-100 last:hidden"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
