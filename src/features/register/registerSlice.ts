import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {registerUserAPI} from './registerAPI';
import {RegisterState, User} from './registerTypes';
import {clearUserData} from './authStorage';

const initialState: RegisterState = {
  failure: false,
  isFetching: false,
  errorMessage: '',
  data: {} as User,
};

const registerSlice = createSlice({
  name: 'register',
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
      .addCase(registerUserAPI.pending, state => {
        state.isFetching = true;
        state.errorMessage = '';
      })
      .addCase(
        registerUserAPI.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isFetching = false;
          state.failure = false;
          state.errorMessage = '';
          state.data = action.payload;
        },
      )
      .addCase(registerUserAPI.rejected, (state, action) => {
        state.isFetching = false;
        state.failure = true;
        state.errorMessage = action.error?.message || 'Something went wrong';
      });
  },
});

export const {logout, clearError} = registerSlice.actions;
export default registerSlice.reducer;
