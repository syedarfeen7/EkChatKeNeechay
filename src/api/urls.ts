const BASE_URL = 'http://localhost:8080';

const API_URLS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    OTP_VERIFICATION: `${BASE_URL}/auth/otp-verification`,
  },
  USER: {
    UPDATE: `${BASE_URL}/users/user`,
    UPLOAD: (userId: string) => `${BASE_URL}/users/upload/${userId}`,
  },
};

export {BASE_URL, API_URLS};
