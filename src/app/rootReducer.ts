import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import loderReducer from '../features/loader/loaderSlice';
import useReducer from '../features/user/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: useReducer,
  loader: loderReducer,
});

export default rootReducer;
