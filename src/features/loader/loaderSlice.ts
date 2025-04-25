import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoaderState {
  isBlockingLoader: boolean;
}

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {loading: false, isBlockingLoader: false},
  reducers: {
    showLoader(state, action: PayloadAction<LoaderState>) {
      state.loading = true;
      state.isBlockingLoader = action.payload.isBlockingLoader;
    },

    hideLoader: state => {
      state.loading = false;
      state.isBlockingLoader = false;
    },
  },
});

export const {showLoader, hideLoader} = loaderSlice.actions;

export default loaderSlice.reducer;
