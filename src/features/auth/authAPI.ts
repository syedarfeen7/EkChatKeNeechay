import {createAsyncThunk} from '@reduxjs/toolkit';
import {hideLoader, showLoader} from '../loader/loaderSlice';
import {LoginOtp, LoginPayload, RegisterPayload, User} from './authTypes';

export const loginUserAPI = createAsyncThunk(
  'auth/login',
  async (
    {
      payload,
      navigation,
      user,
    }: {payload: LoginPayload; navigation: any; user: User},
    {dispatch},
  ): Promise<LoginOtp> => {
    try {
      dispatch(showLoader());

      const {phone} = payload;

      if (user?.phone !== phone) {
        throw new Error('Invalid user');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      navigation.navigate('OTP');
      return {otp: '12345'};
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

      const {firstName, lastName, email, phone, termsAccepted} = payload;
      if (firstName && lastName && phone && email && termsAccepted) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        navigation.navigate('Login');
        return {firstName, lastName, email, phone, termsAccepted};
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
