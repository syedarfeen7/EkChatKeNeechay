import {createAsyncThunk} from '@reduxjs/toolkit';
import {showLoader, hideLoader} from '../loader/loaderSlice';
import {OTPVerification, LoginPayload, RegisterProvider} from './authTypes';
import {API_URLS} from '../../api/urls';
import httpClient from '../../api/httpClient';
import {AppNavigation} from '../../types/navigation';
import {uploadFile, uploadMultipleDocuments} from '../util/utilAPI';
import utils from '../../utils';
import {strings} from '../../i18n';
import {FileType} from '../../types/file';
import {ErrorHelper} from '../../helpers';
import {updateUserState} from '../user/userSlice';

interface LoginArgs {
  payload: LoginPayload;
  navigation: AppNavigation;
}

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
    {dispatch, rejectWithValue},
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
        if (!Array.isArray(payload.documents)) payload.documents = [];

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
    } catch (error: any) {
      ErrorHelper.handleErrors(error, true);
      return rejectWithValue(error); // This propagates the error to the thunk's rejected action
    } finally {
      dispatch(hideLoader());
    }
  },
);

export const loginUserAPI = createAsyncThunk<object, LoginArgs>(
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

      return response;
    } catch (error: any) {
      ErrorHelper.handleErrors(error, true);
      return rejectWithValue(error);
    } finally {
      dispatch(hideLoader());
    }
  },
);

export const otpVerificationAPI = createAsyncThunk(
  'auth/otp-verification',
  async (
    {payload}: {payload: OTPVerification},
    {dispatch, rejectWithValue},
  ): Promise<object> => {
    try {
      const isBlockingLoader = false;
      dispatch(showLoader({isBlockingLoader}));

      const {username, password} = payload;
      if (username && password) {
        const response = await httpClient.post(API_URLS.USER.LOGIN, {
          ...payload,
        });
        dispatch(updateUserState(response?.data));
        return response;
      } else {
        throw new Error('Invalid Credentials!');
      }
    } catch (error: any) {
      ErrorHelper.handleErrors(error, true);
      return rejectWithValue(error);
    } finally {
      dispatch(hideLoader());
    }
  },
);
