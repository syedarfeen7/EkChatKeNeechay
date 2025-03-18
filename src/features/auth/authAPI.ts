import {createAsyncThunk} from '@reduxjs/toolkit';
import {hideLoader, showLoader} from '../loader/loaderSlice';
import {
  LoginOtp,
  LoginPayload,
  OtpPayload,
  RegisterPayload,
  User,
} from './authTypes';
import {API_URLS} from '../../api/urls';
import httpClient from '../../api/httpClient';

export const loginUserAPI = createAsyncThunk(
  'auth/login',
  async (
    {payload, navigation}: {payload: LoginPayload; navigation: any},
    {dispatch},
  ): Promise<LoginOtp> => {
    try {
      dispatch(showLoader());

      const {phoneNumber} = payload;

      const response = await httpClient.get(API_URLS.AUTH.LOGIN, {
        params: {
          phoneNumber,
        },
      });
      navigation.navigate('OTP', {phoneNumber});
      return response?.data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(hideLoader());
    }
  },
);

export const registerUserAPI = createAsyncThunk(
  'auth/register',
  async (
    {payload, navigation}: {payload: RegisterPayload; navigation: any},
    {dispatch},
  ): Promise<User> => {
    try {
      dispatch(showLoader());

      const {firstName, lastName, email, phoneNumber, termsAccepted} = payload;
      if (firstName && lastName && phoneNumber && email && termsAccepted) {
        const response = await httpClient.post(API_URLS.AUTH.REGISTER, payload);
        navigation.navigate('Login');
        return response?.data;
      } else {
        throw new Error('Registration Failed!');
      }
    } catch (error) {
      throw error;
    } finally {
      dispatch(hideLoader());
    }
  },
);
export const otpVerificationAPI = createAsyncThunk(
  'auth/otp/verification',
  async (
    {payload}: {payload: OtpPayload; navigation: any},
    {dispatch},
  ): Promise<User> => {
    try {
      dispatch(showLoader());

      const response = await httpClient.get(API_URLS.AUTH.OTP_VERIFICATION, {
        params: {
          ...payload,
        },
      });
      return response?.data;
    } catch (error) {
      throw error;
    } finally {
      dispatch(hideLoader());
    }
  },
);
