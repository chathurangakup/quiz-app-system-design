"use client";

import { CheckCircle, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "../store";
import { useAppDispatch } from "../store/hooks";
import { updateQuizStatusThunk } from "../store/slices/quizzesSlice";
import {
  fetchWalletByUserId,
  updateWalletBalance,
} from "../store/slices/walletSlice";
import { SubmissionDetail } from "../types/submitquizzes.types";

interface SubmissionDetailViewProps {
  submission: SubmissionDetail;
  userId: string | null;
  quizId: string | null;
}

export default function SubmissionDetailView({
  submission,
  userId,
  quizId,
}: SubmissionDetailViewProps) {
  const percentage = (
    (submission.score / submission.total_questions) *
    100
  ).toFixed(2);

  const dispatch = useAppDispatch();

  const { wallet } = useAppSelector((state) => state.wallet);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [walletForm, setWalletForm] = useState({
    total_earnings: "",
    today_earnings: "",
    available_to_withdraw: "",
  });

  console.log("WALLET IN DETAIL VIEW:", submission);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* ================= LEFT: ANSWER DETAILS ================= */}
      <div className="lg:col-span-3 space-y-4">
        {/* Questions & Answers */}
        {submission.options.map((answer, index) => (
          <div
            key={index}
            className={`rounded-lg border p-6 transition-all ${
              answer.is_correct
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            {/* Question Header */}
            <div className="flex items-start gap-3 mb-4">
              {answer.is_correct ? (
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Q{index + 1}: {answer.question}
                  </h3>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${
                      answer.is_correct
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {answer.is_correct ? "CORRECT" : "WRONG"}
                  </span>
                </div>
              </div>
            </div>

            {/* Options Grid */}
            <div className="space-y-2 mb-4">
              {answer?.options?.map((option, optIdx) => {
                const isUserAnswer = option === answer.user_answer;
                const isCorrectAnswer = option === answer.correct_answer;
                const isWrongSelection = isUserAnswer && !answer.is_correct;

                return (
                  <div
                    key={optIdx}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      isCorrectAnswer
                        ? "bg-green-100 border-green-300"
                        : isWrongSelection
                          ? "bg-red-100 border-red-300"
                          : "bg-white border-gray-200"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold text-sm ${
                        isCorrectAnswer
                          ? "bg-green-600 text-white"
                          : isWrongSelection
                            ? "bg-red-600 text-white"
                            : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </div>

                    <span className="flex-1 text-gray-900">{option}</span>

                    {isCorrectAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    )}
                    {isWrongSelection && (
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* User Answer vs Correct Answer (if wrong) */}
            {!answer.is_correct && (
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-red-200">
                <div>
                  <p className="text-xs text-red-600 font-semibold mb-1">
                    YOUR ANSWER
                  </p>
                  <div className="bg-red-100 p-2 rounded text-sm text-red-900 font-medium">
                    {answer.user_answer || "No Answer"}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-green-600 font-semibold mb-1">
                    CORRECT ANSWER
                  </p>
                  <div className="bg-green-100 p-2 rounded text-sm text-green-900 font-medium">
                    {answer.correct_answer}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ================= RIGHT: SUMMARY PANEL ================= */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border p-6 sticky top-6">
          {/* Status Badge */}
          <div className="mb-6">
            <span
              className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                submission.quiz_status === "COMPLETED"
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {submission.quiz_status}
            </span>
          </div>

          {/* Score Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">TOTAL SCORE</p>
            <div className="text-4xl font-bold text-indigo-600 mb-2">
              {submission.score}
            </div>
            <div className="text-2xl font-semibold text-gray-900">
              out of {submission.total_questions}
            </div>
            <div className="text-lg font-bold text-indigo-600 mt-2">
              {percentage}%
            </div>
          </div>

          {/* Stats Grid */}
          <div className="space-y-3 mb-6">
            {/* Correct Answers */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-green-600 font-semibold">CORRECT</p>
                <p className="text-lg font-bold text-green-900">
                  {submission.correct_answers}
                </p>
              </div>
            </div>

            {/* Wrong Answers */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
              <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-red-600 font-semibold">WRONG</p>
                <p className="text-lg font-bold text-red-900">
                  {submission.wrong_answers}
                </p>
              </div>
            </div>

            {/* Total Questions */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <Clock className="h-5 w-5 text-gray-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-600 font-semibold">
                  TOTAL QUESTIONS
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {submission.total_questions}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={async () => {
              setIsModalOpen(true);

              const res: any = await dispatch(
                fetchWalletByUserId(userId || "") as any,
              );

              if (res?.payload?.wallet) {
                setWalletForm({
                  total_earnings: res.payload.wallet.total_earnings,
                  today_earnings: res.payload.wallet.today_earnings,
                  available_to_withdraw:
                    res.payload.wallet.available_to_withdraw,
                });
              }
            }}
            className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            UPDATE
          </button>

          {/* Progress Bar */}
          <div className="mb-4">
            <p className="text-xs text-gray-600 font-semibold mb-2">ACCURACY</p>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-full transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1 text-right">
              {percentage}%
            </p>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[400px] space-y-4">
              <h2 className="text-xl font-bold text-gray-700">Update Wallet</h2>

              {/* TOTAL */}
              <input
                type="number"
                placeholder="Total Earnings"
                value={walletForm.total_earnings}
                onChange={(e) =>
                  setWalletForm({
                    ...walletForm,
                    total_earnings: e.target.value,
                  })
                }
                className="w-full border p-2 rounded text-gray-700"
              />

              {/* TODAY */}
              <input
                type="number"
                placeholder="Today Earnings"
                value={walletForm.today_earnings}
                onChange={(e) =>
                  setWalletForm({
                    ...walletForm,
                    today_earnings: e.target.value,
                  })
                }
                className="w-full border p-2 rounded text-gray-700"
              />

              {/* AVAILABLE */}
              <input
                type="number"
                placeholder="Available Withdraw"
                value={walletForm.available_to_withdraw}
                onChange={(e) =>
                  setWalletForm({
                    ...walletForm,
                    available_to_withdraw: e.target.value,
                  })
                }
                className="w-full border p-2 rounded text-gray-700"
              />

              {/* APPROVE BUTTON */}
              <button
                onClick={async () => {
                  // 1️⃣ UPDATE QUIZ STATUS
                  await dispatch(
                    updateQuizStatusThunk({
                      quizId: quizId || "",
                      status: "COMPLETED",
                    }) as any,
                  );

                  // 2️⃣ UPDATE WALLET
                  await dispatch(
                    updateWalletBalance({
                      user_id: userId || "",
                      total_earnings: Number(walletForm.total_earnings),
                      today_earnings: Number(walletForm.today_earnings),
                      available_to_withdraw: Number(
                        walletForm.available_to_withdraw,
                      ),
                      transaction_type: "QUIZ_REWARD",
                    }) as any,
                  );

                  setIsModalOpen(false);
                }}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                APPROVE
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-gray-400 text-white py-2 rounded-lg"
              >
                CANCEL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
