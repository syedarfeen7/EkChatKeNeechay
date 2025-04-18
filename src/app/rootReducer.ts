import {combineReducers} from '@reduxjs/toolkit';
import loaderSlice from '../features/loader/loaderSlice';
import userSlice from '../features/user/userSlice';
import localeSlice from '../features/locale/localeSlice';
import appConfigSlice from '../features/appConfig/appConfigSlice';

const rootReducer = combineReducers({
  user: userSlice,
  loader: loaderSlice,
  language: localeSlice,
  appConfig: appConfigSlice,
});

export default rootReducer;
