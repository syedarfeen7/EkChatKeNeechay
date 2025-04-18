import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type Language = 'en' | 'ar' | 'ur';

interface LanguageState {
  selectedLanguage: Language;
}

const initialState: LanguageState = {
  selectedLanguage: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage(state, action: PayloadAction<Language>) {
      state.selectedLanguage = action.payload;
    },
  },
});

export const {changeLanguage} = languageSlice.actions;

export default languageSlice.reducer;
