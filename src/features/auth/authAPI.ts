import {createAsyncThunk} from '@reduxjs/toolkit';
import {showLoader, hideLoader} from '../loader/loaderSlice';
import {OTPVerification, LoginPayload, User, LoginResponse} from './authTypes';
import {API_URLS} from '../../api/urls';
import httpClient from '../../api/httpClient';
import {AppNavigation} from '../../types/navigation';

interface LoginArgs {
  payload: LoginPayload;
  navigation: AppNavigation;
}

export const loginUserAPI = createAsyncThunk<LoginResponse, LoginArgs>(
  'auth/login',
  async ({payload, navigation}, {dispatch, rejectWithValue}) => {
    try {
      dispatch(showLoader());

      if (!payload.phoneNumber) {
        throw new Error('Phone number is required!');
      }

      const response = await httpClient.post(API_URLS.AUTH.REGISTER, payload);

      navigation.navigate('Verify', {
        phoneNumber: payload?.phoneNumber,
      });

      return response?.data;
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

export const otpVerificationAPI = createAsyncThunk(
  'auth/otp-verification',
  async ({payload}: {payload: OTPVerification}, {dispatch}): Promise<User> => {
    try {
      dispatch(showLoader());

      const {username, password} = payload;
      if (username && password) {
        const response = await httpClient.post(API_URLS.USER.LOGIN, {
          ...payload,
        });
        return response?.data;
      } else {
        throw new Error('Invalid Credentials!');
      }
    } catch (error) {
      throw error;
    } finally {
      dispatch(hideLoader());
    }
  },
);
