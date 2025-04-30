export interface UserLogin {
  username: string;
  password: string;
  userType: string;
}

export interface UserState {
  data: User | null;
  isFetching: boolean;
  error: string;
  failure: boolean;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  termsAccepted: boolean;
  address?: string;
  profileImage: string;
  isDefaultOperator: boolean;
  fullName: string;
  arabicName: string;
  accessToken: string;
}
