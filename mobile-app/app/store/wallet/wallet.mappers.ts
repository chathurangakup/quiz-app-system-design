// app/store/wallet/wallet.mapper.ts
import { Wallet, WalletTransaction } from "./wallet.types";

export const mapWalletResponse = (data: any): Wallet => ({
  id: data.id,
  totalEarnings: Number(data.total_earnings),
  todayEarnings: Number(data.today_earnings),
  availableToWithdraw: Number(data.available_to_withdraw),
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});

export const walletMapperTransaction = {
  toTransaction(raw: any): WalletTransaction {
    return {
      id: raw.id,
      type: raw.type,
      amount: Number(raw.amount),
      referenceId: raw.reference_id,
      createdAt: raw.created_at,
    };
  },
};
