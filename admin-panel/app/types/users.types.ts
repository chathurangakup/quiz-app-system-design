export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  country: string;
  kyc_status: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UsersResponse {
  count: number;
  users: User[];
}

export interface UsersState {
  users: User[];
  count: number;
  isLoading: boolean;
  error: string | null;
}
