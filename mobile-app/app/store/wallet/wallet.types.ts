// app/store/wallet/wallet.types.ts

export interface Wallet {
  id: string;
  totalEarnings: number;
  todayEarnings: number;
  availableToWithdraw: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletState {
  wallet: Wallet | null;
  loading: boolean;
  error: string | null;
  transactions: WalletTransaction[];
}

export interface WalletTransaction {
  id: string;
  type: "QUIZ_REWARD" | "WITHDRAW" | "DEPOSIT";
  amount: number;
  referenceId: string;
  createdAt: string;
}
