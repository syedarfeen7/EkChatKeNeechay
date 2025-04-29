import {combineReducers} from '@reduxjs/toolkit';
import loaderSlice from '../features/loader/loaderSlice';
import userSlice from '../features/user/userSlice';
import localeSlice from '../features/locale/localeSlice';
import appConfigSlice from '../features/appConfig/appConfigSlice';
import authSlice from '../features/auth/authSlice';

const rootReducer = combineReducers({
  user: userSlice,
  auth: authSlice,
  loader: loaderSlice,
  language: localeSlice,
  appConfig: appConfigSlice,
});

export default rootReducer;
