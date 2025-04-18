import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loginUser} from './userAPI';
import {User} from '../register/registerTypes';
import {UserState} from './userTypes';

const initialState: UserState = {
  failure: false,
  isFetching: false,
  error: '',
  data: {} as User,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = '';
    },
    updateUserState(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isFetching = true;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isFetching = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error.message || '';
      });
  },
});

export const {clearUserError, updateUserState} = userSlice.actions;
export default userSlice.reducer;
