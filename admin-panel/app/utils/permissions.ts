import { User } from "../types";

export const hasPermission = (user: User | null, requiredRole: string) => {
  if (!user) return false;

  const roleHierarchy = {
    admin: 3,
    moderator: 2,
    support: 1,
  };

  const userLevel = roleHierarchy[user.role] || 0;
  //  const requiredLevel = roleHierarchy[requiredRole] || 0;

  return userLevel >= 1;
};

export const canAccess = (user: User | null, resource: string) => {
  if (!user) return false;

  const permissions = {
    admin: ["users", "quizzes", "kyc", "wallets", "withdrawals", "admins"],
    moderator: ["users", "quizzes", "kyc"],
    support: ["users", "kyc"],
  };

  return permissions[user.role]?.includes(resource) || false;
};
