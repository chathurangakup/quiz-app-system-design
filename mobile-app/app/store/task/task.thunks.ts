// store/task/task.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { taskService } from "../../services/task.service";
import { mapQuizToQuizTask, mapQuizToTask } from "./task.mappers";
import { QuizSubmission, QuizTask, Task } from "./task.types";

export type QuizAnswer = {
  option_id: string;
  user_submit_ans: string;
};

/* ---------- Fetch All Quizzes ---------- */
export const fetchQuizzes = createAsyncThunk<
  Task[],
  "EASY" | "MEDIUM" | "HARD",
  { rejectValue: string }
>("task/fetchQuizzes", async (difficulty, { rejectWithValue }) => {
  try {
    const data = await taskService.getQuiz(difficulty);
    console.log("Fetched Quizzes Data:", data);
    return data.quizzes?.map(mapQuizToTask) ?? [];
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch quizzes",
    );
  }
});

/* ---------- Fetch Quiz By ID ---------- */
export const fetchQuizById = createAsyncThunk<
  QuizTask,
  string,
  { rejectValue: string }
>("task/fetchQuizById", async (quizId, { rejectWithValue }) => {
  try {
    const data = await taskService.getQuizById(quizId);
    console.log("data", data);
    return mapQuizToQuizTask(data);
  } catch (error: any) {
    return mapQuizToQuizTask("");
  }
});

export const submitQuiz = createAsyncThunk<
  any,
  { quizId: string; answers: QuizAnswer[] },
  { rejectValue: string }
>(
  "task/submitQuiz",
  async ({ quizId, answers }, { rejectWithValue }) => {
    try {

      console.log("SUBMIT ARRAY:", answers);

      // 🔥 send array directly
      const data = await taskService.submitQuiz(
        quizId,
        answers
      );

      return data;

    } catch (error: any) {

      return rejectWithValue(
        error?.response?.data?.message ||
        "Failed to submit quiz"
      );

    }
  }
);


export const fetchQuizSubmissions = createAsyncThunk<
  QuizSubmission[],
  void,
  { rejectValue: string }
>("task/fetchQuizSubmissions", async (_, { rejectWithValue }) => {
  try {
    const data = await taskService.getQuizSubmissions();
    return data.submissions; // 👈 matches API response
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch quiz submissions",
    );
  }
});
