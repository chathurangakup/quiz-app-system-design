"use client";

import { Calendar, Filter, Plus, Trophy, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAllQuizzes } from "../../store/slices/quizzesSlice";

export default function QuizzesPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data, isLoading, error } = useAppSelector((state) => state.quizzes);
  const [difficulty, setDifficulty] = useState<string>("");

  useEffect(() => {
    dispatch(fetchAllQuizzes({ difficulty }));
  }, [dispatch, difficulty]);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quizzes</h1>
          <p className="mt-1 text-gray-600">
            Manage and view all available quizzes on the platform.
          </p>
        </div>
        <button
          onClick={() => router.push("/quizzes/create")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="h-5 w-5" />
          Create New Quiz
        </button>
      </div>

      {/* Filter Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <label className="text-sm font-medium text-gray-700">
            Filter by Difficulty:
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading quizzes...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Quizzes Grid */}
      {!isLoading && !error && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.quizzes && data.quizzes.length > 0 ? (
            data.quizzes.map((quiz: any) => (
              <div
                key={quiz.id}
                onClick={() => router.push(`/quizzes/${quiz.id}`)}
                className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
              >
                {/* Image */}
                {quiz.image_url && (
                  <div className="relative h-48 w-full bg-gray-200">
                    <img
                      src={quiz.image_url}
                      alt={quiz.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            quiz.difficulty === "EASY"
                              ? "bg-green-100 text-green-700"
                              : quiz.difficulty === "MEDIUM"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                      >
                        {quiz.difficulty}
                      </span>
                    </div>
                    <div className="absolute top-2 left-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            quiz.status === "ACTIVE"
                              ? "bg-blue-100 text-blue-700"
                              : quiz.status === "PROCESSING"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {quiz.status}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {quiz.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {quiz.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">
                        {quiz.total_questions} Q
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">
                        ${quiz.reward_amount}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">
                        {new Date(quiz.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div className="border-t pt-2">
                    <p className="text-xs text-gray-500">
                      Created: {new Date(quiz.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">
                No quizzes found for this difficulty level.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Total Count */}
      {!isLoading && data.quizzes && data.quizzes.length > 0 && (
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <p>Showing {data.quizzes.length} quizzes</p>
          <p>Total: {data.total}</p>
        </div>
      )}
    </div>
  );
}
