"use client";

import { ArrowLeft, Clock, FileText, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchKycRequests,
  reviewKycRequest,
} from "../../../store/slices/kycSlice";
import { KycRequest } from "../../../types/kyc.types";

export default function KycDetailPage() {
  const params = useParams();
  const router = useRouter();
  const kycId = params.id as string;
  const dispatch = useAppDispatch();
  const { data, isLoading, error, isReviewing, reviewError } = useAppSelector(
    (state) => state.kyc,
  );
  const [kycItem, setKycItem] = useState<KycRequest | null>(null);
  const [status, setStatus] = useState<"PENDING" | "APPROVED" | "REJECTED">(
    "PENDING",
  );
  const [reviewNote, setReviewNote] = useState("");
  const [userId, setUserId] = useState("");

  console.log("KYC ID from params:", kycId);

  useEffect(() => {
    dispatch(fetchKycRequests());
  }, [dispatch]);

  useEffect(() => {
    if (data.kycRequests && kycId) {
      const found = data.kycRequests.find((kyc) => kyc.id === kycId);
      setKycItem(found || null);
      if (found) {
        setStatus(found.status);
        setReviewNote(found.review_note || "");
      }
    }
  }, [data.kycRequests, kycId]);

  // Get user ID from localStorage (assuming it's stored there during login)
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID not found. Please login again.");
      return;
    }

    if (status === "PENDING") {
      alert("Please select either Approved or Rejected status.");
      return;
    }

    const result = await dispatch(
      reviewKycRequest({
        kycId,
        payload: {
          status: status as "APPROVED" | "REJECTED",
          reviewed_by: userId,
          review_note: reviewNote,
        },
      }),
    );

    if (reviewKycRequest.fulfilled.match(result)) {
      alert("KYC request reviewed successfully!");
      router.push("/kyc");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <p className="text-gray-600">Loading KYC details...</p>
      </div>
    );
  }

  if (!kycItem) {
    return (
      <div className="space-y-6 p-6">
        <Link
          href="/kyc"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to KYC List
        </Link>
        <p className="mt-4 text-gray-600">KYC item not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Back Button */}
      <Link
        href="/kyc"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to KYC List
      </Link>

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">KYC Details</h1>
          <p className="mt-1 text-gray-600">
            Complete KYC information for {kycItem.user_email}
          </p>
        </div>
        <span
          className={`text-sm font-semibold px-4 py-2 rounded-full w-fit
            ${
              kycItem.status === "APPROVED"
                ? "bg-green-100 text-green-700"
                : kycItem.status === "REJECTED"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {kycItem.status}
        </span>
      </div>

      {/* Main Details Card */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email
                </label>
                <p className="mt-1 text-gray-900">{kycItem.user_email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Address
                </label>
                <div className="mt-1 flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-900">{kycItem.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Document Information */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Document Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Document Type
                </label>
                <p className="mt-1 text-gray-900">{kycItem.document_type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Document Number
                </label>
                <p className="mt-1 text-gray-900">{kycItem.document_number}</p>
              </div>
            </div>
          </div>

          {/* Document Images */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Document Images
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {kycItem.document_image_front_url && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Front
                  </label>
                  <img
                    src={kycItem.document_image_front_url}
                    alt="Document Front"
                    className="mt-2 rounded-lg border border-gray-200 h-64 w-full object-cover"
                  />
                </div>
              )}
              {kycItem.document_image_back_url && (
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Back
                  </label>
                  <img
                    src={kycItem.document_image_back_url}
                    alt="Document Back"
                    className="mt-2 rounded-lg border border-gray-200 h-64 w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Selfie Image */}
          {kycItem.selfie_image_url && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Selfie
              </h2>
              <img
                src={kycItem.selfie_image_url}
                alt="Selfie"
                className="rounded-lg border border-gray-200 h-80 w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Right Column - Status Info */}
        <div className="space-y-6">
          {/* Review Form Card */}
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Review KYC Request
            </h2>

            {/* Status Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as "PENDING" | "APPROVED" | "REJECTED",
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            {/* Review Notes */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Review Notes
              </label>
              <textarea
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Enter your review notes..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={4}
              />
            </div>

            {/* Error Message */}
            {reviewError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {reviewError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isReviewing}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isReviewing ? "Submitting..." : "Submit Review"}
            </button>
          </form>

          {/* Current Status Info */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Current Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-medium text-gray-900">{kycItem.status}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Submitted</p>
                  <p className="font-medium text-gray-900">
                    {new Date(kycItem.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {kycItem.reviewed_at && (
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Reviewed</p>
                    <p className="font-medium text-gray-900">
                      {new Date(kycItem.reviewed_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}

              {kycItem.reviewed_by && (
                <div>
                  <p className="text-sm text-gray-600">Reviewed By</p>
                  <p className="font-medium text-gray-900">
                    {kycItem.reviewed_by}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Review Notes Display */}
          {kycItem.review_note && (
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Review Notes
              </h2>
              <p className="text-gray-700">{kycItem.review_note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
