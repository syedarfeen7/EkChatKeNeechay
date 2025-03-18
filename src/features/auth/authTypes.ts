export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  otp: string | null;
  isAuthenticated: boolean;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  termsAccepted: boolean;
}
export interface LoginOtp {
  otp: string;
}

export interface LoginPayload {
  phone: string;
}
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  termsAccepted: boolean;
}
export interface OtpPayload {
  otp: string;
}
