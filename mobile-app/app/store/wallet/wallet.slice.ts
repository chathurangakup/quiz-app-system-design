// app/store/wallet/wallet.slice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchWallet, fetchWalletTransactions } from "./wallet.thunk";
import { WalletState } from "./wallet.types";

/* ================= STATE ================= */

const initialState: WalletState = {
  wallet: null,
  transactions: [],
  loading: false,
  error: null,
};

/* ================= SLICE ================= */

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.wallet = action.payload;
        state.loading = false;
      })
      .addCase(fetchWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchWalletTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWalletTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchWalletTransactions.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default walletSlice.reducer;
