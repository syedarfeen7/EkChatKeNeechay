import {createAsyncThunk} from '@reduxjs/toolkit';
import {showLoader, hideLoader} from '../loader/loaderSlice';
import {RegisterPayload, User} from './registerTypes';
import {API_URLS} from '../../api/urls';
import httpClient from '../../api/httpClient';
import {AppNavigation} from '../../types/navigation';

interface RegisterArgs {
  payload: RegisterPayload;
  navigation: AppNavigation;
}

export const registerUserAPI = createAsyncThunk<User, RegisterArgs>(
  'auth/register',
  async ({payload, navigation}, {dispatch, rejectWithValue}) => {
    try {
      dispatch(showLoader());

      if (!payload.phoneNumber) {
        throw new Error('Phone number is required!');
      }

      const response = await httpClient.post(API_URLS.AUTH.REGISTER, payload);

      navigation.navigate('Verify');

      return response.data as User;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Registration failed';
      return rejectWithValue(message);
    } finally {
      dispatch(hideLoader());
    }
  },
);
