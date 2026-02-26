"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import SubmissionDetailView from "../../../components/submissionDetailView";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchSubmissionDetail } from "../../../store/slices/submitquizzesSlice";

export default function SubmissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const submissionId = params.id as string;
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const quizId = searchParams.get("quizId");
  const { detailedSubmission, detailLoading, detailError } = useAppSelector(
    (state) => state.submitquizzes,
  );

  useEffect(() => {
    if (submissionId) {
      dispatch(fetchSubmissionDetail(submissionId) as any);
    }
  }, [dispatch, submissionId]);

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Submissions
      </button>

      {/* Loading State */}
      {detailLoading && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3 animate-spin" />
          <p className="text-gray-600">Loading submission details...</p>
        </div>
      )}

      {/* Error State */}
      {detailError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{detailError}</p>
        </div>
      )}

      {/* Detail View */}
      {detailedSubmission && !detailLoading && (
        <SubmissionDetailView
          submission={detailedSubmission}
          userId={userId}
          quizId={quizId}
        />
      )}
    </div>
  );
}
