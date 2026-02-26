import api from "./api";

export const walletService = {
  getWalletByUserId: (userId: string) => api.get(`/wallet/${userId}`),
  updateWalletBalance: (data: {
    user_id: string;
    total_earnings: number;
    today_earnings: number;
    available_to_withdraw: number;
    transaction_type: string;
  }) => api.post("/wallet/update-balance", data),
  getAllWallets: () => api.get("/wallet/admin/all-wallets"),
};
