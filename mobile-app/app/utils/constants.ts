export const constants = {
  APP_NAME: "TaskEarn",
  APP_VERSION: "1.0.0",

  // API Endpoints
  API_BASE_URL: "https://api.yourapp.com/v1",

  // Storage keys
  STORAGE_KEYS: {
    AUTH_TOKEN: "auth_token",
    USER_DATA: "user_data",
    KYC_STATUS: "kyc_status",
  },

  // Task categories
  TASK_CATEGORIES: [
    "Video",
    "Survey",
    "App Testing",
    "Social Media",
    "Website",
    "Review",
    "Signup",
    "Other",
  ],

  // Task difficulties
  TASK_DIFFICULTIES: ["easy", "medium", "hard"] as const,

  // Task statuses
  TASK_STATUSES: ["pending", "completed", "cancelled"] as const,

  // Transaction types
  TRANSACTION_TYPES: ["credit", "debit"] as const,

  // KYC statuses
  KYC_STATUSES: ["pending", "verified", "rejected"] as const,

  // Colors
  COLORS: {
    PRIMARY: "#6366F1",
    SUCCESS: "#10B981",
    WARNING: "#F59E0B",
    ERROR: "#EF4444",
    INFO: "#3B82F6",
  },

  // Limits
  WITHDRAWAL_MIN_AMOUNT: 10,
  WITHDRAWAL_MAX_AMOUNT: 1000,
  DAILY_TASK_LIMIT: 20,
};

export const countries = [
  "Sri Lanka",
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
];
