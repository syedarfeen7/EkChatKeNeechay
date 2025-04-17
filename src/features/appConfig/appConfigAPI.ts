import {createAsyncThunk} from '@reduxjs/toolkit';
import {API_URLS} from '../../api/urls';
import httpClient from '../../api/httpClient';

interface AppConfigResponse {
  [key: string]: any;
}

export const getAppConfigAPI = createAsyncThunk<
  AppConfigResponse,
  void,
  {
    rejectValue: {
      message: string;
    };
  }
>('config/settings', async (_, {rejectWithValue}) => {
  try {
    const response = await httpClient.get(API_URLS.SETTINGS.APP_CONFIG);
    return response?.data;
  } catch (error: any) {
    return rejectWithValue({
      message: error?.message || 'Something went wrong',
    });
  }
});
