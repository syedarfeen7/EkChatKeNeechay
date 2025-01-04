import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginUserAPI} from './authAPI';
import {AuthState, User} from './authTypes';
// import {persistUserData, clearUserData} from './authStorage';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
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
      .addCase(loginUserAPI.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        // persistUserData(action.payload); // Save user data to storage
      })
      .addCase(loginUserAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;
