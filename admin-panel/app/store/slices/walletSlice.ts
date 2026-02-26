import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { walletService } from "../../services/wallet.services";
import {
  AdminWallet,
  UpdateWalletPayload,
  WalletResponse,
  WalletState,
} from "../../types/wallet.types";

const initialState: WalletState = {
  wallet: null,
  wallets: [],
  isLoading: false,
  error: null,
};

// GET WALLET BY USER ID
export const fetchWalletByUserId = createAsyncThunk<
  WalletResponse,
  string,
  { rejectValue: string }
>("wallet/fetchByUserId", async (userId, { rejectWithValue }) => {
  try {
    const response = await walletService.getWalletByUserId(userId);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch wallet",
    );
  }
});

export const updateWalletBalance = createAsyncThunk<
  WalletResponse,
  UpdateWalletPayload,
  { rejectValue: string }
>("wallet/updateBalance", async (data, { rejectWithValue }) => {
  try {
    const response = await walletService.updateWalletBalance(data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update wallet",
    );
  }
});

export const fetchAllWallets = createAsyncThunk<
  { wallets: AdminWallet[] },
  void,
  { rejectValue: string }
>("wallet/fetchAllWallets", async (_, { rejectWithValue }) => {
  try {
    const response = await walletService.getAllWallets();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch wallets",
    );
  }
});

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWalletByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wallet = action.payload.wallet;
      })
      .addCase(fetchWalletByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(updateWalletBalance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateWalletBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wallet = action.payload.wallet;
      })
      .addCase(updateWalletBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchAllWallets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllWallets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wallets = action.payload.wallets;
      })
      .addCase(fetchAllWallets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default walletSlice.reducer;
