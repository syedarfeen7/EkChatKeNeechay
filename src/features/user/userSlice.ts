import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {updateUserAPI, uploadUserImageAPI} from './userAPI';
import {User} from '../register/registerTypes';
import {UserState} from './userTypes';

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = '';
    },
    updateUserState(state, action) {
      state.profile = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateUserAPI.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        updateUserAPI.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.profile = action.payload;
          state.error = '';
        },
      )
      .addCase(updateUserAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      });

    builder
      .addCase(uploadUserImageAPI.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(
        uploadUserImageAPI.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          if (state.profile) {
            state.profile.profileImage = action.payload.profileImage;
          }
          state.error = '';
        },
      )
      .addCase(uploadUserImageAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      });
  },
});

export const {clearUserError, updateUserState} = userSlice.actions;
export default userSlice.reducer;
