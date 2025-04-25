import {createAsyncThunk} from '@reduxjs/toolkit';
import {showLoader, hideLoader} from '../loader/loaderSlice';
import {
  OTPVerification,
  LoginPayload,
  User,
  LoginResponse,
  RegisterProvider,
} from './authTypes';
import {API_URLS} from '../../api/urls';
import httpClient from '../../api/httpClient';
import {AppNavigation} from '../../types/navigation';
import {uploadFile, uploadMultipleDocuments} from '../util/utilAPI';
import utils from '../../utils';
import {strings} from '../../i18n';
import {FileType} from '../../types/file';

interface LoginArgs {
  payload: LoginPayload;
  navigation: AppNavigation;
}

export const loginUserAPI = createAsyncThunk<LoginResponse, LoginArgs>(
  'auth/login',
  async ({payload, navigation}, {dispatch, rejectWithValue}) => {
    try {
      const isBlockingLoader = false;
      dispatch(showLoader({isBlockingLoader}));

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
      const isBlockingLoader = false;
      dispatch(showLoader({isBlockingLoader}));

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

export const registerProviderAPI = createAsyncThunk(
  'auth/service-provider',
  async (
    {
      payload,
      navigation,
      image,
    }: {
      payload: RegisterProvider;
      navigation: AppNavigation;
      image: FileType | null;
    },
    {dispatch},
  ): Promise<object> => {
    try {
      const isBlockingLoader = false;
      dispatch(showLoader({isBlockingLoader}));

      const {englishName, mobilePhone, adminEmail} = payload;
      if (englishName && mobilePhone && adminEmail) {
        if (Object.values(payload?.documents || {}).some(doc => !!doc)) {
          const uploadedDocs = await uploadMultipleDocuments(payload.documents);

          payload.documents = [...uploadedDocs];
        }

        if (image) {
          const uploadedDocs = await uploadFile(image);
          payload.logo = uploadedDocs;
        }
        if (typeof payload?.documents === 'object') payload.documents = [];

        const response = await httpClient.post(
          API_URLS.AUTH.REGISTER_PROVIDER,
          {
            ...payload,
          },
        );
        if (response?.data?.message === 'shop.createdSuccessfully') {
          utils.showAlertWithDelay(
            strings('alertMessages.success'),
            strings('serviceMessages.providerRequested'),
          );
          navigation.goBack();
        }
        return response?.data;
      } else {
        throw new Error('Required Fields are missing!');
      }
    } catch (error) {
      throw error;
    } finally {
      dispatch(hideLoader());
    }
  },
);
