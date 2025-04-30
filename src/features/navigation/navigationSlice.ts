import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AppState {
  oldView?: string;
  newView?: string;
  appState?: string;
}

const initialState: AppState = {
  oldView: undefined,
  newView: undefined,
  appState: undefined,
};

const appStateSlice = createSlice({
  name: 'navigationState',
  initialState,
  reducers: {
    drawerMenuSwitched: (
      state,
      action: PayloadAction<{oldView?: string; newView?: string}>,
    ) => {
      state.oldView = action.payload.oldView;
      state.newView = action.payload.newView;
    },
    appStateChanged: (state, action: PayloadAction<string>) => {
      state.appState = action.payload;
    },
    logout: () => initialState,
  },
});

export const {drawerMenuSwitched, appStateChanged, logout} =
  appStateSlice.actions;

export default appStateSlice.reducer;
