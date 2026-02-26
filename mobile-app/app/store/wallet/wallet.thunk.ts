import { walletService } from "@/app/services/wallet.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Wallet, WalletTransaction } from "./wallet.types";

export const fetchWallet = createAsyncThunk<
  Wallet,
  void,
  { rejectValue: string }
>("wallet/fetchWallet", async (_, { rejectWithValue }) => {
  try {
    return await walletService.getWallet();
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch wallet"
    );
  }
});

export const fetchWalletTransactions = createAsyncThunk<
  WalletTransaction[],
  void,
  { rejectValue: string }
>("wallet/fetchWalletTransactions", async (_, { rejectWithValue }) => {
  try {
    return await walletService.getTransactions();
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch transactions"
    );
  }
});
