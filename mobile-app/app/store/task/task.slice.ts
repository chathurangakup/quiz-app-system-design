// store/task/task.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchQuizById,
  fetchQuizSubmissions,
  fetchQuizzes,
  submitQuiz,
} from "./task.thunks";
import { QuizTask, Task, TaskState } from "./task.types";

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,
  submissions: [], // ✅ NEW
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearSelectedTask(state) {
      state.selectedTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- Quiz List ---------- */
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchQuizzes.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.tasks = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      /* ---------- Single Quiz ---------- */
      .addCase(fetchQuizById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchQuizById.fulfilled,
        (state, action: PayloadAction<QuizTask>) => {
          state.selectedTask = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })
      // Submit Quiz
      .addCase(submitQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.loading = false;
        // You can handle a success message here if needed
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to submit quiz";
      })

      /* ---- Fetch quiz submissions ---- */
      .addCase(fetchQuizSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizSubmissions.fulfilled, (state, action) => {
        state.submissions = action.payload;
        state.loading = false;
      })
      .addCase(fetchQuizSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;
