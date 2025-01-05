import {createAsyncThunk} from '@reduxjs/toolkit';
import {LoginPayload, User} from './authTypes';
import {showLoader, hideLoader} from '../loader/loaderSlice';

export const loginUserAPI = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, {dispatch}): Promise<User> => {
    try {
      dispatch(showLoader());

      const {phone} = payload;
      if (phone) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {id: 1, name: 'Test User', phone};
      } else {
        throw new Error('Invalid user');
      }
    } catch (error) {
      throw error;
    } finally {
      dispatch(hideLoader());
    }
  },
);
