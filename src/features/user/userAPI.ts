import {createAsyncThunk} from '@reduxjs/toolkit';
import {hideLoader, showLoader} from '../loader/loaderSlice';
import {UserLogin} from './userTypes';
import {API_URLS} from '../../api/urls';
import httpClient from '../../api/httpClient';
import {User} from '../auth/authTypes';

export const loginUser = createAsyncThunk(
  'user/login',
  async ({payload}: {payload: UserLogin}, {dispatch}): Promise<User> => {
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
