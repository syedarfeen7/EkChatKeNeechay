import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppConfigState} from './appConfigTypes';
import {getAppConfigAPI} from './appConfigAPI';
import {defaultServer} from '../../api/urls';

const initialState: AppConfigState = {
  serverUrl: defaultServer,
  deviceToken: '',
  failure: false,
  isFetching: false,
  errorMessage: '',
  isAnalyticsSend: false,
  topicNames: [],
  data: {},
};

const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    changeServer(state, action: PayloadAction<string>) {
      state.serverUrl = action.payload;
    },
    updateDeviceToken(state, action: PayloadAction<string>) {
      state.deviceToken = action.payload;
    },
    updateAppAnalyticsLocally(state, action: PayloadAction<boolean>) {
      state.isAnalyticsSend = action.payload;
    },
    updateTopicNames(state, action: PayloadAction<string[]>) {
      state.topicNames = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAppConfigAPI.pending, state => {
        state.isFetching = true;
      })
      .addCase(getAppConfigAPI.fulfilled, (state, action) => {
        state.isFetching = false;
        state.failure = false;
        state.errorMessage = '';
        state.data = action.payload;
      })
      .addCase(getAppConfigAPI.rejected, (state, action) => {
        state.isFetching = false;
        state.failure = true;
        state.errorMessage = action.error?.message || 'An error occurred';
      });
  },
});

export const {
  changeServer,
  updateDeviceToken,
  updateAppAnalyticsLocally,
  updateTopicNames,
} = appConfigSlice.actions;

export default appConfigSlice.reducer;
