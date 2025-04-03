export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string;
  isAuthenticated: boolean;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  termsAccepted: boolean;
  address?: string;
  profileImage: string;
}
export interface LoginOtp {
  otp: string;
}

export interface LoginPayload {
  phoneNumber: string;
}
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  termsAccepted: boolean;
}
export interface OtpPayload {
  otp: string;
  phoneNumber: string;
}
