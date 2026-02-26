import { KycRequest } from "@/app/types/kyc.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { kycService, ReviewKycPayload } from "../../services/kyc.services";

interface KycState {
  data: {
    kycRequests: KycRequest[];
    count: number;
  };
  isLoading: boolean;
  error: string | null;
  isReviewing: boolean;
  reviewError: string | null;
}

const initialState: KycState = {
  data: { kycRequests: [], count: 0 },
  isLoading: false,
  error: null,
  isReviewing: false,
  reviewError: null,
};

// 🔹 Async thunk
export const fetchKycRequests = createAsyncThunk(
  "kyc/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await kycService.getAllKycRequests();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load KYC requests",
      );
    }
  },
);

export const reviewKycRequest = createAsyncThunk(
  "kyc/review",
  async (
    { kycId, payload }: { kycId: string; payload: ReviewKycPayload },
    { rejectWithValue },
  ) => {
    try {
      return await kycService.reviewKycRequest(kycId, payload);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to review KYC request",
      );
    }
  },
);

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    clearReviewError: (state) => {
      state.reviewError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKycRequests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchKycRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = {
          kycRequests: action.payload?.kycRequests || [],
          count: action.payload?.count || 0,
        };
      })
      .addCase(fetchKycRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(reviewKycRequest.pending, (state) => {
        state.isReviewing = true;
        state.reviewError = null;
      })
      .addCase(reviewKycRequest.fulfilled, (state, action) => {
        state.isReviewing = false;
        // Update the KYC item in the list
        const index = state.data.kycRequests.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.data.kycRequests[index] = action.payload;
        }
      })
      .addCase(reviewKycRequest.rejected, (state, action) => {
        state.isReviewing = false;
        state.reviewError = action.payload as string;
      });
  },
});

export const { clearReviewError } = kycSlice.actions;
export default kycSlice.reducer;
