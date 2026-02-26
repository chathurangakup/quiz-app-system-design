"use client";

import { ArrowLeft, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  clearCreateError,
  createQuiz,
} from "../../../store/slices/quizzesSlice";
import { images } from "../../../utils/images";

export default function CreateQuizPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { createLoading, createError } = useAppSelector(
    (state) => state.quizzes,
  );

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    total_questions: 10,
    reward_amount: 50,
    difficulty: "EASY",
    deadline: "",
    created_by: "1a302ba0-198b-437b-9a0a-16d75ecb5c3e",
  });

  /* -------------------- Handlers -------------------- */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "total_questions" || name === "reward_amount"
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setUploadError("");

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image_url: "" }));
  };

  const uploadImageToSupabase = async (file: File): Promise<string> => {
    try {
      const fileName = `public/quizzes/${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("quizzes") // bucket name
        .upload(fileName, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("quizzes")
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.error("Supabase upload error:", err);
      throw err;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearCreateError());

    try {
      let imageUrl = formData.image_url;

      if (imageFile) {
        imageUrl = await uploadImageToSupabase(imageFile);
      }

      if (!imageUrl) {
        setUploadError("Image is required");
        return;
      }

      const result = await dispatch(
        createQuiz({ ...formData, image_url: imageUrl }) as any,
      );

      if (result.meta.requestStatus === "fulfilled") {
        router.push("/quizzes");
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* -------------------- UI -------------------- */

  return (
    <div className="p-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 mb-6"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Form */}
        <div className="bg-white rounded-lg border p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Create New Quiz
          </h1>

          {(createError || uploadError) && (
            <div className="mb-4 bg-red-50 border border-red-200 p-3 rounded">
              <p className="text-red-600 text-sm">
                {createError || uploadError}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <h6 className="text-sm text-gray-500">Title</h6>
            <input
              type="text"
              name="title"
              placeholder="Quiz Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded text-black placeholder-gray-400 "
            />
            <h6 className="text-sm text-gray-500">Description</h6>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded h-24 text-black placeholder-gray-400 "
            />

            {/* Image */}
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} className="rounded" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="border-dashed border p-6 rounded cursor-pointer flex flex-col items-center gap-2 text-gray-600 hover:bg-gray-50">
                <Upload />
                <span>Upload Image</span>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
            <h6 className="text-sm text-gray-500">Total Quection</h6>
            <input
              type="number"
              name="total_questions"
              value={formData.total_questions}
              onChange={handleChange}
              className="w-full border p-2 rounded text-black placeholder-gray-400"
            />
            <h6 className="text-sm text-gray-500">Reward Amount</h6>
            <input
              type="number"
              name="reward_amount"
              value={formData.reward_amount}
              onChange={handleChange}
              className="w-full border p-2 rounded text-black placeholder-gray-400"
            />

            <h6 className="text-sm text-gray-500">Difficulty</h6>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full border p-2 rounded text-black placeholder-gray-400"
            >
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
            <h6 className="text-sm text-gray-500">Date time</h6>
            <input
              type="datetime-local"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded text-black placeholder-gray-400"
            />

            <button
              disabled={createLoading || uploading}
              className="w-full bg-green-600 text-white p-2 rounded"
            >
              {uploading
                ? "Uploading Image..."
                : createLoading
                  ? "Creating..."
                  : "Create Quiz"}
            </button>
          </form>
        </div>

        {/* Right: Splash Image */}
        <div className="hidden lg:flex justify-center items-center">
          <div className="relative w-full h-96">
            <Image
              src={images.splash}
              alt="Create Quiz"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
