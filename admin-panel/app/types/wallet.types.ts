export interface Wallet {
  id: string;
  total_earnings: string;
  today_earnings: string;
  available_to_withdraw: string;
  created_at: string;
  updated_at: string;
}

export interface WalletResponse {
  wallet: Wallet;
}

export interface WalletState {
  wallet: Wallet | null;
  wallets: AdminWallet[];
  isLoading: boolean;
  error: string | null;
}

export interface UpdateWalletPayload {
  user_id: string;
  total_earnings: number;
  today_earnings: number;
  available_to_withdraw: number;
  transaction_type: string;
}

export interface AdminWallet {
  wallet_id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  profile_picture_url: string;
  kyc_status: "PENDING" | "APPROVED" | "REJECTED";
  total_earnings: number;
  today_earnings: number;
  available_to_withdraw: number;
  created_at: string;
  updated_at: string;
}
