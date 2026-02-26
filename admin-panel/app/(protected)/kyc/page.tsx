"use client";

import KycList from "@/app/components/kycList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.users);

  // useEffect(() => {
  //   dispatch(fetchAllUsers());
  // }, [dispatch]);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-gray-600">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} loading={isLoading} />
        ))}
      </div> */}

      {/* Top Quizzes Section */}
      <KycList />
    </div>
  );
}
