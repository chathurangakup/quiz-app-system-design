"use client";

import { ChevronRight, Clock, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../store/hooks";
import { fetchKycRequests } from "../store/slices/kycSlice";
import { KycRequest } from "../types/kyc.types";

export default function KycList() {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.kyc,
  );

  useEffect(() => {
    dispatch(fetchKycRequests());
  }, [dispatch]);

  return (
    <div className="rounded-xl border bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">KYC Requests</h3>
        <p className="mt-1 text-sm text-gray-600">
          Pending and processed KYC submissions
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <p className="text-sm text-gray-500">Loading KYC requests...</p>
      )}

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* KYC List */}
      <div className="space-y-4">
        {data.kycRequests.map((kyc: KycRequest) => (
          <Link
            key={kyc.id}
            href={`/kyc/${kyc.id}`}
            className="rounded-lg border border-gray-100 bg-gray-50 p-4 hover:bg-white hover:shadow-md transition-all block group"
          >
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 hover:bg-white hover:shadow-sm transition-all">
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{kyc.user_email}</h4>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full
                    ${
                      kyc.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : kyc.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {kyc.status}
                  </span>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </div>

              {/* Document Info */}
              <div className="mt-2 text-sm text-gray-700">
                <p>
                  <strong>Document:</strong> {kyc.document_type}
                </p>
                <p>
                  <strong>Number:</strong> {kyc.document_number}
                </p>
              </div>

              {/* Meta */}
              <div className="mt-3 grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {kyc.address}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {kyc.reviewed_at ? "Reviewed" : "Not Reviewed"}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(kyc.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Empty State */}
        {!isLoading && data.kycRequests.length === 0 && (
          <p className="text-sm text-gray-500 text-center">
            No KYC requests found
          </p>
        )}
      </div>
    </div>
  );
}
