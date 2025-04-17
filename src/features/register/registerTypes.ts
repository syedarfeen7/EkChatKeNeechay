export interface RegisterState {
  isFetching: boolean;
  failure: boolean;
  errorMessage: string;
  data: object;
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

export interface RegisterPayload {
  phoneNumber: string;
  userType: string;
}
