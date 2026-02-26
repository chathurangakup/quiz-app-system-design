"use client";

import { Clock, Mail, MapPin, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAllUsers } from "../store/slices/usersSlice";

export default function UserList() {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    console.log("Fetching users...");
    dispatch(fetchAllUsers());
  }, []);

  return (
    <div className="rounded-xl border bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Registered Users
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Recently registered users in the system
        </p>
      </div>

      {/* States */}
      {isLoading && <p className="text-sm text-gray-500">Loading users...</p>}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* User List */}
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-lg border border-gray-100 bg-gray-50 p-4 hover:bg-white hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Name & Status */}
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{user.name}</h4>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full
                      ${
                        user.kyc_status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {user.kyc_status}
                  </span>
                </div>

                {/* Email */}
                <div className="mt-1 flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>

                {/* Meta Info */}
                <div className="mt-3 grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {user.country}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {!isLoading && users.length === 0 && (
          <p className="text-sm text-gray-500 text-center">No users found</p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All Users →
        </button>
      </div>
    </div>
  );
}
