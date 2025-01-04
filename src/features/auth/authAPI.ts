import {createAsyncThunk} from '@reduxjs/toolkit';
import {LoginPayload, User} from './authTypes';

export const loginUserAPI = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload): Promise<User> => {
    const {phone} = payload;
    if (phone) {
      return {id: 1, name: 'Test User', phone};
    } else {
      throw new Error('Invalid user');
    }
  },
);
