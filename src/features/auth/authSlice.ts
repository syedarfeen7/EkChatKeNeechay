import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginUserAPI, otpVerificationAPI, registerProviderAPI} from './authAPI';
import {AuthState} from './authTypes';
import {clearUserData} from './authStorage';

const initialState: AuthState = {
  failure: false,
  isFetching: false,
  errorMessage: '',
  isAuthenticated: false,
  response: {} as object,
};

const registerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      clearUserData();
      return {...initialState};
    },
    clearError: state => {
      state.errorMessage = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUserAPI.pending, state => {
        state.isFetching = true;
        state.errorMessage = '';
      })
      .addCase(
        loginUserAPI.fulfilled,
        (state, action: PayloadAction<object>) => {
          state.isFetching = false;
          state.failure = false;
          state.errorMessage = '';
          state.response = action.payload;
        },
      )
      .addCase(loginUserAPI.rejected, (state, action) => {
        state.isFetching = false;
        state.failure = true;
        state.errorMessage = action.error?.message || 'Something went wrong';
      });
    builder
      .addCase(otpVerificationAPI.pending, state => {
        state.isFetching = true;
        state.errorMessage = '';
      })
      .addCase(otpVerificationAPI.fulfilled, state => {
        state.isFetching = false;
        state.failure = false;
        state.errorMessage = '';
        state.isAuthenticated = true;
      })
      .addCase(otpVerificationAPI.rejected, (state, action) => {
        state.isFetching = false;
        state.failure = true;
        state.errorMessage = action.error?.message || 'Something went wrong';
        state.isAuthenticated = false;
      });
    builder
      .addCase(registerProviderAPI.pending, state => {
        state.isFetching = true;
        state.errorMessage = '';
      })
      .addCase(registerProviderAPI.fulfilled, state => {
        state.isFetching = false;
        state.failure = false;
        state.errorMessage = '';
      })
      .addCase(registerProviderAPI.rejected, (state, action) => {
        state.isFetching = false;
        state.failure = true;
        state.errorMessage = action.error?.message || 'Something went wrong';
      });
  },
});

export const {logout, clearError} = registerSlice.actions;
export default registerSlice.reducer;
