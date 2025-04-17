import {combineReducers} from '@reduxjs/toolkit';
import registerReducer from '../features/register/registerSlice';
import loderReducer from '../features/loader/loaderSlice';
import useReducer from '../features/user/userSlice';
import localeSlice from '../features/locale/localeSlice';
import appConfigSlice from '../features/appConfig/appConfigSlice';

const rootReducer = combineReducers({
  register: registerReducer,
  user: useReducer,
  loader: loderReducer,
  language: localeSlice,
  appConfig: appConfigSlice,
});

export default rootReducer;
