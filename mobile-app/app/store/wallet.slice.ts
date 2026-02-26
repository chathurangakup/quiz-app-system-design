import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface WalletState {
  balance: number;
  transactions: Transaction[];
  loading: boolean;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "credit",
    amount: 5.0,
    description: "Task completion reward",
    date: "2024-01-15 14:30",
    status: "completed",
  },
  {
    id: "2",
    type: "credit",
    amount: 10.0,
    description: "Referral bonus",
    date: "2024-01-14 09:15",
    status: "completed",
  },
  {
    id: "3",
    type: "debit",
    amount: 15.0,
    description: "Withdrawal to bank",
    date: "2024-01-13 16:45",
    status: "completed",
  },
  {
    id: "4",
    type: "credit",
    amount: 3.5,
    description: "Daily check-in bonus",
    date: "2024-01-12 08:00",
    status: "completed",
  },
  {
    id: "5",
    type: "credit",
    amount: 8.0,
    description: "Survey completion",
    date: "2024-01-11 11:20",
    status: "completed",
  },
  {
    id: "6",
    type: "debit",
    amount: 20.0,
    description: "Gift card purchase",
    date: "2024-01-10 19:30",
    status: "completed",
  },
  {
    id: "7",
    type: "credit",
    amount: 12.5,
    description: "Video watching task",
    date: "2024-01-09 13:45",
    status: "completed",
  },
];

const initialState: WalletState = {
  balance: 156.8,
  transactions: mockTransactions,
  loading: false,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    fetchBalance: (state) => {
      state.loading = true;
    },
    fetchBalanceSuccess: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
      state.loading = false;
    },
    fetchBalanceFailure: (state) => {
      state.loading = false;
    },
    fetchTransactions: (state) => {
      state.loading = true;
    },
    fetchTransactionsSuccess: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
      state.loading = false;
    },
    fetchTransactionsFailure: (state) => {
      state.loading = false;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
      if (action.payload.type === "credit") {
        state.balance += action.payload.amount;
      } else {
        state.balance -= action.payload.amount;
      }
    },
    withdraw: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    withdrawSuccess: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
      state.balance -= action.payload.amount;
      state.loading = false;
    },
    withdrawFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fetchBalance,
  fetchBalanceSuccess,
  fetchBalanceFailure,
  fetchTransactions,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
  addTransaction,
  withdraw,
  withdrawSuccess,
  withdrawFailure,
} = walletSlice.actions;

export default walletSlice.reducer;
