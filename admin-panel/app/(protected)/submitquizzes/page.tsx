"use client";

import { useEffect } from "react";
import SubmitQuizzesList from "../../components/submitQuizzesList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAllSubmitQuizzes } from "../../store/slices/submitquizzesSlice";

export default function SubmitQuizzesPage() {
  const dispatch = useAppDispatch();
  const { submissions, isLoading, error } = useAppSelector(
    (state) => state.submitquizzes,
  );

  useEffect(() => {
    dispatch(fetchAllSubmitQuizzes() as any);
  }, [dispatch]);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quiz Submissions</h1>
          <p className="mt-1 text-gray-600">
            View all submitted quizzes and user performance.
          </p>
        </div>
      </div>

      {/* Submit Quizzes List */}
      <SubmitQuizzesList
        submissions={submissions}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
