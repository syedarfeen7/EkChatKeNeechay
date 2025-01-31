import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginUserAPI, otpVerificationAPI, registerUserAPI} from './authAPI';
import {AuthState, LoginOtp, User} from './authTypes';
// import {persistUserData, clearUserData} from './authStorage';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  otp: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      //   clearUserData(); // Clear user data from storage
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUserAPI.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUserAPI.fulfilled,
        (state, action: PayloadAction<LoginOtp>) => {
          state.isLoading = false;
          state.otp = action.payload?.otp;
          // persistUserData(action.payload); // Save user data to storage
        },
      )
      .addCase(loginUserAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      });
    builder
      .addCase(registerUserAPI.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        registerUserAPI.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.user = action.payload;
          // persistUserData(action.payload); // Save user data to storage
        },
      )
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
          state.otp = null;
          state.isAuthenticated = true;
        },
      )
      .addCase(otpVerificationAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message || 'OTP Verification failed';
      });
  },
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;
