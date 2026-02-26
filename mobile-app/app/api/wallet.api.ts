// app/store/wallet/wallet.api.ts
import api from "../services/api"; // your axios instance

export const walletApi = {
  getWallet: async () => {
    const response = await api.get("/wallet");
    return response.data;
  },
  getTransactions: async () => {
    const res = await api.get("/wallet/transactions");
    return res.data;
  },
};
