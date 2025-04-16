import {User} from '../register/registerTypes';

export interface UpdateUserPayload {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  address: string;
  id?: string;
}

export interface UserState {
  profile: User | null;
  isLoading: boolean;
  error: string;
}
