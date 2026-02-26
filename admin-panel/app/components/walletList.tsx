"use client";

import { Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchAllWallets,
  updateWalletBalance,
} from "../store/slices/walletSlice";

export default function WalletList() {
  const dispatch = useAppDispatch();
  const { wallets, isLoading } = useAppSelector((state) => state.wallet);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const [walletForm, setWalletForm] = useState({
    total_earnings: "",
    today_earnings: "",
    available_to_withdraw: "",
  });

  useEffect(() => {
    dispatch(fetchAllWallets());
  }, [dispatch]);

  return (
    <>
      <div className="space-y-4">
        {wallets.map((wallet) => (
          <div
            key={wallet.wallet_id}
            onClick={() => {
              setSelectedUserId(wallet.user_id);

              setWalletForm({
                total_earnings: wallet.total_earnings.toString(),
                today_earnings: wallet.today_earnings.toString(),
                available_to_withdraw: wallet.available_to_withdraw.toString(),
              });

              setIsModalOpen(true);
            }}
            className="cursor-pointer rounded-lg border border-gray-100 bg-gray-50 p-4 hover:bg-white hover:shadow-sm transition-all"
          >
            <h4 className="font-medium text-gray-900">{wallet.name}</h4>

            <div className="mt-1 flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <span>{wallet.email}</span>
            </div>

            <div className="mt-3 flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-900">
                {wallet.country}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-3">
              <div>
                <p className="text-xs text-gray-500">Total Earnings</p>
                <p className="text-sm font-semibold text-gray-900">
                  Rs. {wallet.total_earnings}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Today Earnings</p>
                <p className="text-sm font-semibold text-gray-900">
                  Rs. {wallet.today_earnings}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Withdrawable</p>
                <p className="text-sm font-semibold text-green-600">
                  Rs. {wallet.available_to_withdraw}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] space-y-4">
            <h2 className="text-xl font-bold text-gray-700">Update Wallet</h2>

            <input
              type="number"
              placeholder="Total Earnings"
              value={walletForm.total_earnings}
              onChange={(e) =>
                setWalletForm({
                  ...walletForm,
                  total_earnings: e.target.value,
                })
              }
              className="w-full border p-2 rounded text-gray-700"
            />

            <input
              type="number"
              placeholder="Today Earnings"
              value={walletForm.today_earnings}
              onChange={(e) =>
                setWalletForm({
                  ...walletForm,
                  today_earnings: e.target.value,
                })
              }
              className="w-full border p-2 rounded text-gray-700"
            />

            <input
              type="number"
              placeholder="Available Withdraw"
              value={walletForm.available_to_withdraw}
              onChange={(e) =>
                setWalletForm({
                  ...walletForm,
                  available_to_withdraw: e.target.value,
                })
              }
              className="w-full border p-2 rounded text-gray-700"
            />

            {/* APPROVE */}
            <button
              onClick={async () => {
                await dispatch(
                  updateWalletBalance({
                    user_id: selectedUserId,
                    total_earnings: Number(walletForm.total_earnings),
                    today_earnings: Number(walletForm.today_earnings),
                    available_to_withdraw: Number(
                      walletForm.available_to_withdraw,
                    ),
                    transaction_type: "ADJUSTMENT",
                  }) as any,
                );

                setIsModalOpen(false);

                dispatch(fetchAllWallets()); // refresh list
              }}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              UPDATE WALLET
            </button>

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-gray-400 text-white py-2 rounded-lg"
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
    </>
  );
}
