"use client";

import { ArrowLeft, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  createQuizOption,
  fetchQuizOptions,
} from "../../../store/slices/quizzesSlice";
import { QuizOption } from "../../../types";

export default function QuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const quizId = params.id as string;

  const { options, optionsLoading, optionsError } = useAppSelector(
    (state) => state.quizzes,
  );

  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [editData, setEditData] = useState({
    question: "",
    options: [] as string[],
  });
  const [saveLoading, setSaveLoading] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [correctAns, setCorrectAns] = useState("");
  const { createOptionLoading, createOptionError } = useAppSelector(
    (state) => state.quizzes,
  );

  useEffect(() => {
    dispatch(fetchQuizOptions(quizId));
  }, [dispatch, quizId]);

  useEffect(() => {
    if (options.length > 0 && !selectedOption) {
      setSelectedOption(options[0]);
      setEditData({
        question: options[0].question,
        options: options[0].option_text,
      });
    } else if (options.length === 0) {
      setSelectedOption(null);
      setEditData({
        question: "",
        options: [] as string[],
      });
    }
  }, [options, selectedOption]);

  const handleSelectOption = (option: QuizOption) => {
    setSelectedOption(option);
    setEditData({
      question: option.question,
      options: option.option_text,
    });
  };

  const handleEditChange = (field: "question" | "options", value: any) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...editData.options];
    updated[index] = value;
    setEditData((prev) => ({ ...prev, options: updated }));
  };

  const handleNewOptionChange = (index: number, value: string) => {
    const updated = [...newOptions];
    updated[index] = value;
    setNewOptions(updated);
  };

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      console.log("Saving:", editData);
      // await updateQuizOption(selectedOption?.id!, editData);
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion || newOptions.some((opt) => !opt) || !correctAns) return;
    await dispatch(
      createQuizOption({
        quiz_id: quizId,
        question: newQuestion,
        option_text: newOptions,
        correct_ans: correctAns,
      }) as any,
    );
    setNewQuestion("");
    setNewOptions(["", "", "", ""]);
    setCorrectAns("");
    dispatch(fetchQuizOptions(quizId) as any);
  };

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ================= LEFT: QUESTION LIST ================= */}
        <div className="lg:col-span-1 bg-white rounded-lg border p-4 h-[80vh] overflow-y-auto">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Questions</h2>

          {optionsLoading && <p className="text-sm">Loading...</p>}
          {optionsError && (
            <p className="text-sm text-red-600">{optionsError}</p>
          )}

          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left p-3 rounded-lg border transition ${
                  selectedOption?.id === option.id
                    ? "bg-blue-100 border-blue-300"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <p className="text-sm font-medium text-gray-900">
                  Q{index + 1}
                </p>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {option.question}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="lg:col-span-3 space-y-6">
          {/* ---------- Preview ---------- */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-900">
              Question Preview
            </h2>

            {selectedOption ? (
              <div className="space-y-4">
                <p className="font-semibold text-gray-900">
                  {selectedOption.question}
                </p>

                <div className="space-y-2">
                  {selectedOption.option_text.map((opt, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded border"
                    >
                      <span className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded-full text-xs">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-xs text-gray-600 line-clamp-2">
                        {opt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Select a question</p>
            )}
          </div>

          {/* ---------- Edit Selected Question ---------- */}
          {/* {selectedOption && (
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-bold mb-4">Edit Question</h2>

              <div className="space-y-4">
                <textarea
                  value={editData.question}
                  onChange={(e) => handleEditChange("question", e.target.value)}
                  rows={3}
                  className="w-full border rounded px-4 py-2 text-black"
                />

                {editData.options.map((opt, i) => (
                  <input
                    key={i}
                    value={opt}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    className="w-full border rounded px-4 py-2 text-black"
                  />
                ))}

                <button
                  onClick={handleSave}
                  disabled={saveLoading}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  <Save className="h-4 w-4" />
                  {saveLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )} */}

          {/* ---------- Add New Question ---------- */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-900">
              Add New Question
            </h2>

            <form onSubmit={handleAddQuestion} className="space-y-4">
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                rows={3}
                className="w-full border rounded px-4 py-2 text-black"
                placeholder="Enter question"
                required
              />

              {newOptions.map((opt, i) => (
                <input
                  key={i}
                  value={opt}
                  onChange={(e) => handleNewOptionChange(i, e.target.value)}
                  className="w-full border rounded px-4 py-2 text-black"
                  placeholder={`Option ${i + 1}`}
                  required
                />
              ))}

              <select
                value={correctAns}
                onChange={(e) => setCorrectAns(e.target.value)}
                className="w-full border rounded px-4 py-2 text-black"
                required
              >
                <option value="">Correct answer</option>
                {newOptions.map((opt, i) => (
                  <option key={i} value={opt}>
                    {String.fromCharCode(65 + i)}. {opt || "Option"}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={createOptionLoading}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                <Save className="h-4 w-4" />
                {createOptionLoading ? "Adding..." : "Add Question"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
