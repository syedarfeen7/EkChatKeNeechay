export interface AuthState {
  isFetching: boolean;
  failure: boolean;
  errorMessage: string;
  data: object;
  response: object;
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

export interface LoginPayload {
  phoneNumber: string;
  userType: string;
}

export interface OTPVerification {
  username: string;
  password: string;
  userType: string;
}
