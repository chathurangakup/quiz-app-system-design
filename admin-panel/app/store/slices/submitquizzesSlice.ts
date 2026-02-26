import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { submitquizzesService } from "../../services/submitquizzes.services";
import {
  SubmissionDetail,
  SubmitQuizzesResponse,
  SubmitQuizzesState,
} from "../../types/submitquizzes.types";

const initialState: SubmitQuizzesState = {
  submissions: [],
  detailedSubmission: null,
  isLoading: false,
  detailLoading: false,
  error: null,
  detailError: null,
};

// Fetch all submitted quizzes
export const fetchAllSubmitQuizzes = createAsyncThunk<
  SubmitQuizzesResponse,
  void,
  { rejectValue: string }
>("submitquizzes/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await submitquizzesService.getAllSubmitQuizzes();
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch submit quizzes",
    );
  }
});

// Fetch submission detail
export const fetchSubmissionDetail = createAsyncThunk<
  SubmissionDetail,
  string,
  { rejectValue: string }
>("submitquizzes/fetchDetail", async (submissionId, { rejectWithValue }) => {
  try {
    return await submitquizzesService.getSubmissionDetail(submissionId);
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch submission detail",
    );
  }
});

const submitquizzesSlice = createSlice({
  name: "submitquizzes",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearDetailError(state) {
      state.detailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAllSubmitQuizzes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllSubmitQuizzes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.submissions = action.payload.submissions;
      })
      .addCase(fetchAllSubmitQuizzes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })

      // Fetch detail
      .addCase(fetchSubmissionDetail.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchSubmissionDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.detailedSubmission = action.payload;
      })
      .addCase(fetchSubmissionDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload || "Something went wrong";
      });
  },
});

export const { clearError, clearDetailError } = submitquizzesSlice.actions;

export default submitquizzesSlice.reducer;
