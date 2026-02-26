// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "moderator" | "support";
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// KYC Types
export interface KYCRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: "pending" | "approved" | "rejected";
  documentType: "passport" | "id_card" | "driver_license";
  documentUrl: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

// User Types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "moderator" | "support";
  status: "active" | "inactive";
  lastLogin: string;
  createdAt: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  questionsCount: number;
  participants: number;
  status: "draft" | "published" | "archived";
  createdAt: string;
}

export interface QuizOption {
  id: string;
  quiz_id: string;
  question: string;
  option_text: string[];
  correct_ans?: string;
}

export interface QuizOptionsResponse {
  message: string;
  options: QuizOption[];
}

export interface Wallet {
  id: string;
  userId: string;
  userName: string;
  balance: number;
  currency: string;
  lastTransaction: string;
  status: "active" | "frozen";
}

export interface Withdrawal {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  method: "bank_transfer" | "crypto" | "paypal";
  status: "pending" | "processing" | "completed" | "rejected";
  requestedAt: string;
  completedAt?: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalQuizzes: number;
  pendingKYC: number;
  totalWithdrawals: number;
  totalRevenue: number;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  ipAddress: string;
}
