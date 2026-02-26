import { AdminUser, DashboardStats, KYCRequest } from "../types";

export const mockDashboardStats: DashboardStats = {
  totalUsers: 12543,
  activeUsers: 8942,
  totalQuizzes: 324,
  pendingKYC: 23,
  totalWithdrawals: 456,
  totalRevenue: 125430,
  recentActivities: [
    {
      id: "1",
      user: "John Doe",
      action: "User registration",
      timestamp: "2024-01-15T10:30:00Z",
      ipAddress: "192.168.1.1",
    },
    {
      id: "2",
      user: "Admin User",
      action: "KYC Approved",
      timestamp: "2024-01-15T09:15:00Z",
      ipAddress: "192.168.1.2",
    },
  ],
};

export const mockKYCRequests: KYCRequest[] = [
  {
    id: "1",
    userId: "user_001",
    userName: "John Doe",
    userEmail: "john@example.com",
    status: "pending",
    documentType: "passport",
    documentUrl: "/documents/passport_001.jpg",
    submittedAt: "2024-01-15T10:30:00Z",
  },
  // Add more mock data...
];

export const mockUsers: AdminUser[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Super Admin",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15T10:30:00Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
  // Add more mock data...
];
