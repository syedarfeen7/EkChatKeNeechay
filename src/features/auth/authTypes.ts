export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface User {
  id: number;
  name: string;
  phone: string;
}

export interface LoginPayload {
  phone: string;
}
