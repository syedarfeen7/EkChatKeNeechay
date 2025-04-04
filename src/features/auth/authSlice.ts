import {createSlice} from '@reduxjs/toolkit';
import {loginUserAPI, otpVerificationAPI, registerUserAPI} from './authAPI';
import {AuthState} from './authTypes';
import {clearUserData} from './authStorage';

const initialState: AuthState = {
  isLoading: false,
  error: '',
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      clearUserData(); // Clear user data from storage
    },
    clearError(state) {
      state.error = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUserAPI.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(loginUserAPI.fulfilled, state => {
        state.isLoading = false;
        state.error = '';
      })
      .addCase(loginUserAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      });
    builder
      .addCase(registerUserAPI.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(registerUserAPI.fulfilled, state => {
        state.isLoading = false;
        state.error = '';
      })
      .addCase(registerUserAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      });
    builder
      .addCase(otpVerificationAPI.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(otpVerificationAPI.fulfilled, state => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.error = '';
      })
      .addCase(otpVerificationAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message || '';
      });
  },
});

export const {logout, clearError} = authSlice.actions;

export default authSlice.reducer;
