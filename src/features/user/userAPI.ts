import {createAsyncThunk} from '@reduxjs/toolkit';
import {hideLoader, showLoader} from '../loader/loaderSlice';
import {UpdateUserPayload} from './userTypes';
import {API_URLS} from '../../api/urls';
import httpClient from '../../api/httpClient';
import {User} from '../auth/authTypes';

export const updateUserAPI = createAsyncThunk(
  'users/user',
  async (
    {payload, id}: {payload: UpdateUserPayload; id: string},
    {dispatch},
  ): Promise<User> => {
    try {
      dispatch(showLoader());

      const {firstName, lastName, email, phoneNumber, address} = payload;
      if (firstName && lastName && phoneNumber && email && address) {
        const response = await httpClient.put(API_URLS.USER.UPDATE, {
          ...payload,
          id,
        });
        return response?.data;
      } else {
        throw new Error('Update User Failed!');
      }
    } catch (error) {
      throw error;
    } finally {
      dispatch(hideLoader());
    }
  },
);
