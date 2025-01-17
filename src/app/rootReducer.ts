import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import loderReducer from '../features/loader/loaderSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  loader: loderReducer,
});

export default rootReducer;
