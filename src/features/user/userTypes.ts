import {User} from '../auth/authTypes';

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
