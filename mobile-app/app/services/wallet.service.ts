// app/store/wallet/wallet.service.ts
import { walletApi } from "../api/wallet.api";
import {
  mapWalletResponse,
  walletMapperTransaction,
} from "../store/wallet/wallet.mappers";
import { WalletTransaction } from "../store/wallet/wallet.types";

export const walletService = {
  getWallet: async () => {
    const data = await walletApi.getWallet();
    return mapWalletResponse(data.wallet);
  },
  getTransactions: async (): Promise<WalletTransaction[]> => {
    const res = await walletApi.getTransactions();
    return res.transactions.map(walletMapperTransaction.toTransaction);
  },
};
