"use client";

import { AlertCircle, Award, ChevronRight, Clock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitQuiz } from "../types/submitquizzes.types";

interface SubmitQuizzesListProps {
  submissions: SubmitQuiz[];
  isLoading: boolean;
  error: string | null;
}

export default function SubmitQuizzesList({
  submissions,
  isLoading,
  error,
}: SubmitQuizzesListProps) {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "PROCESSING":
        return "bg-blue-100 text-blue-700";
      case "FAILED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-50 border-green-200";
      case "PENDING":
        return "bg-yellow-50 border-yellow-200";
      case "REJECTED":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getScorePercentage = (score: number, total: number) => {
    return total > 0 ? ((score / total) * 100).toFixed(2) : "0";
  };

  const handleViewDetails = (
    submissionId: string,
    userId: string,
    quizId: string,
  ) => {
    router.push(
      `/submitquizzes/${submissionId}?userId=${userId}&quizId=${quizId}`,
    );
  };

  return (
    <div className="rounded-xl border bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Quiz Submissions
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Track user quiz submissions and performance
        </p>
      </div>

      {/* States */}
      {isLoading && (
        <p className="text-sm text-gray-500">Loading submissions...</p>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            onClick={() =>
              handleViewDetails(
                submission.id,
                submission.user_id,
                submission.quiz_id,
              )
            }
            className={`rounded-lg border p-4 hover:shadow-md transition-all cursor-pointer ${getKycStatusColor(
              submission.kyc_status,
            )}`}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left: Profile & Basic Info */}
              <div className="flex-1">
                {/* Name & Quiz Title */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {submission.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {submission.quiz_title}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(
                      submission.quiz_status,
                    )}`}
                  >
                    {submission.quiz_status}
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                  <Mail className="h-4 w-4" />
                  <span>{submission.email}</span>
                </div>

                {/* Meta Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  {/* KYC Status */}
                  <div className="text-sm">
                    <p className="text-gray-500 text-xs">KYC Status</p>
                    <span
                      className={`inline-block mt-1 text-xs font-medium px-2 py-1 rounded-full ${
                        submission.kyc_status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {submission.kyc_status}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="text-sm">
                    <p className="text-gray-500 text-xs">Score</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Award className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold text-gray-900">
                        {submission.score}/{submission.total_questions}
                      </span>
                      <span className="text-xs text-gray-600">
                        (
                        {getScorePercentage(
                          submission.score,
                          submission.total_questions,
                        )}
                        %)
                      </span>
                    </div>
                  </div>

                  {/* Submitted Date */}
                  <div className="text-sm">
                    <p className="text-gray-500 text-xs">Submitted</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(submission.submitted_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="text-sm">
                    <p className="text-gray-500 text-xs">Time</p>
                    <span className="text-sm font-medium text-gray-900 mt-1 block">
                      {new Date(submission.submitted_at).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Profile Picture & Action */}
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                {submission.profile_picture_url && (
                  <img
                    src={submission.profile_picture_url}
                    alt={submission.name}
                    className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                  />
                )}
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        ))}

        {!isLoading && submissions.length === 0 && (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No quiz submissions found</p>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      {submissions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-600">Total Submissions</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {submissions.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Completed</p>
              <p className="text-lg font-semibold text-green-600 mt-1">
                {
                  submissions.filter((s) => s.quiz_status === "COMPLETED")
                    .length
                }
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Processing</p>
              <p className="text-lg font-semibold text-blue-600 mt-1">
                {
                  submissions.filter((s) => s.quiz_status === "PROCESSING")
                    .length
                }
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Avg Score</p>
              <p className="text-lg font-semibold text-purple-600 mt-1">
                {submissions.length > 0
                  ? (
                      submissions.reduce((sum, s) => sum + s.score, 0) /
                      submissions.length
                    ).toFixed(2)
                  : "0"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
