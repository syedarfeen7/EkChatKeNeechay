import axios from 'axios';
import {BASE_URL} from './urls';
import {ErrorObjects} from '../helpers';

const httpClient = axios.create({
  baseURL: BASE_URL,
});

httpClient.interceptors.request.use(
  async config => {
    const token = '';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Only set Content-Type if not already provided
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  response => response.data,
  error => {
    const err = error?.response;
    let customError = {};

    if (err?.status === 400 && err?.data?.error === 'error.exceededAttempts') {
      customError = ErrorObjects.ERROR_TOO_MANY_REQUESTS();
    } else if (err?.data?.error === 'error.otpExpired') {
      customError = ErrorObjects.ERROR_OTP_EXPIRED();
    } else if (err?.data?.error === 'error.accessDenied') {
      // SessionHelper.onLogout();
      customError = ErrorObjects.SESSION_EXPIRED();
    } else if (
      err?.data?.error === 'error.userNotFound' ||
      err?.data?.error === 'error.notFound'
    ) {
      customError = ErrorObjects.ERROR_USER_NOT_FOUND();
    } else {
      // General fallback
      switch (err?.status) {
        case 401:
          customError = ErrorObjects.ERROR_CLIENT_CREDENTIALS();
          break;
        case 404:
          customError = ErrorObjects.ERROR_USER_NOT_FOUND();
          break;
        case 408:
          customError = ErrorObjects.ERROR_REQUEST_TIMEOUT();
          break;
        case 500:
          customError = ErrorObjects.ERROR_SERVER_CONNECTION();
          break;
        default:
          customError = {
            title: 'Error',
            message: err?.data?.error || error.error || 'Something went wrong',
          };
      }
    }

    return Promise.reject(customError);
  },
);

export default httpClient;
