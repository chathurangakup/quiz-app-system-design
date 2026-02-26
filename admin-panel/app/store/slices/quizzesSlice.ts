import { Quiz, QuizOption } from "@/app/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CreateQuizPayload,
  quizzesService,
} from "../../services/quizzes.services";

interface CreateQuizOptionPayload {
  quiz_id: string;
  question: string;
  option_text: string[];
  correct_ans: string;
}

interface QuizzesState {
  data: {
    quizzes: Quiz[];
    total: number;
  };
  isLoading: boolean;
  error: string | null;

  createLoading: boolean;
  createError: string | null;

  options: QuizOption[];
  optionsLoading: boolean;
  optionsError: string | null;

  createOptionLoading: boolean;
  createOptionError: string | null;

  updateStatusLoading: boolean;
  updateStatusError: string | null;
}

const initialState: QuizzesState = {
  data: { quizzes: [], total: 0 },
  isLoading: false,
  error: null,

  createLoading: false,
  createError: null,

  options: [],
  optionsLoading: false,
  optionsError: null,

  createOptionLoading: false,
  createOptionError: null,
  updateStatusLoading: false,
  updateStatusError: null,
};

/* ===================== THUNKS ===================== */

// Fetch quizzes
export const fetchAllQuizzes = createAsyncThunk(
  "quizzes/fetchAll",
  async ({ difficulty }: { difficulty?: string } = {}, { rejectWithValue }) => {
    try {
      return await quizzesService.getAllQuizzes(difficulty);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load quizzes",
      );
    }
  },
);

// Create quiz
export const createQuiz = createAsyncThunk(
  "quizzes/create",
  async (payload: CreateQuizPayload, { rejectWithValue }) => {
    try {
      return await quizzesService.createQuiz(payload);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create quiz",
      );
    }
  },
);

// Fetch quiz options
export const fetchQuizOptions = createAsyncThunk(
  "quizzes/fetchOptions",
  async (quizId: string, { rejectWithValue }) => {
    try {
      return await quizzesService.getQuizOptions(quizId);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load options",
      );
    }
  },
);

// Create quiz option
export const createQuizOption = createAsyncThunk(
  "quizzes/createOption",
  async (payload: CreateQuizOptionPayload, { rejectWithValue }) => {
    try {
      return await quizzesService.createQuizOption(payload);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add question",
      );
    }
  },
);

export const updateQuizStatusThunk = createAsyncThunk(
  "quizzes/updateStatus",
  async (
    {
      quizId,
      status,
    }: {
      quizId: string;
      status: "ACTIVE" | "PROCESSING" | "COMPLETED";
    },
    { rejectWithValue },
  ) => {
    try {
      return await quizzesService.updateQuizStatus(quizId, status);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update quiz status",
      );
    }
  },
);

/* ===================== SLICE ===================== */

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    clearCreateError(state) {
      state.createError = null;
    },
    clearOptionsError(state) {
      state.optionsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- Fetch Quizzes ---------- */
      .addCase(fetchAllQuizzes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllQuizzes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = {
          quizzes: action.payload?.quizzes ?? [],
          total: action.payload?.total ?? 0,
        };
      })
      .addCase(fetchAllQuizzes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /* ---------- Create Quiz ---------- */
      .addCase(createQuiz.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createQuiz.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload as string;
      })

      /* ---------- Fetch Options ---------- */
      .addCase(fetchQuizOptions.pending, (state) => {
        state.optionsLoading = true;
        state.optionsError = null;
      })
      .addCase(fetchQuizOptions.fulfilled, (state, action) => {
        state.optionsLoading = false;
        state.options = action.payload?.options ?? [];
      })
      .addCase(fetchQuizOptions.rejected, (state, action) => {
        state.optionsLoading = false;
        state.optionsError = action.payload as string;
        state.options = [];
      })

      /* ---------- Create Quiz Option ---------- */
      .addCase(createQuizOption.pending, (state) => {
        state.createOptionLoading = true;
        state.createOptionError = null;
      })
      .addCase(createQuizOption.fulfilled, (state) => {
        state.createOptionLoading = false;
      })
      .addCase(createQuizOption.rejected, (state, action) => {
        state.createOptionLoading = false;
        state.createOptionError = action.payload as string;
      })

      /* ---------- Update Quiz Status ---------- */
      .addCase(updateQuizStatusThunk.pending, (state) => {
        state.updateStatusLoading = true;
        state.updateStatusError = null;
      })
      .addCase(updateQuizStatusThunk.fulfilled, (state, action) => {
        state.updateStatusLoading = false;

        const updatedQuiz = action.payload?.quiz;

        if (updatedQuiz) {
          const index = state.data.quizzes.findIndex(
            (q) => q.id === updatedQuiz.id,
          );

          if (index !== -1) {
            state.data.quizzes[index].status = updatedQuiz.status;
          }
        }
      })
      .addCase(updateQuizStatusThunk.rejected, (state, action) => {
        state.updateStatusLoading = false;
        state.updateStatusError = action.payload as string;
      });
  },
});

export const { clearCreateError, clearOptionsError } = quizzesSlice.actions;

export default quizzesSlice.reducer;
