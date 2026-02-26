import { createSlice } from "@reduxjs/toolkit";
import { createKycRequestThunk, getMyKycThunk } from "./kyc.thunk";

interface KYCState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: KYCState = {
  data: null,
  loading: false,
  error: null,
};

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    resetKYC: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createKycRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createKycRequestThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createKycRequestThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getMyKycThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyKycThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getMyKycThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetKYC } = kycSlice.actions;
export default kycSlice.reducer;
