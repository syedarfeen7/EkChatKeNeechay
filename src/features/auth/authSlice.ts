import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginUserAPI, otpVerificationAPI, registerUserAPI} from './authAPI';
import {AuthState, User} from './authTypes';
import {clearUserData} from './authStorage';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      clearUserData(); // Clear user data from storage
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUserAPI.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserAPI.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUserAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      });
    builder
      .addCase(registerUserAPI.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserAPI.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUserAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Registration failed';
      });
    builder
      .addCase(otpVerificationAPI.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        otpVerificationAPI.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
          state.error = null;
        },
      )
      .addCase(otpVerificationAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message || 'OTP Verification failed';
      });
  },
});

export const {logout, clearError} = authSlice.actions;

export default authSlice.reducer;
