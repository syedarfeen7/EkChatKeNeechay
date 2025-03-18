const BASE_URL = 'http://localhost:8082';

const API_URLS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    OTP_VERIFICATION: `${BASE_URL}/auth/otp-verification`,
  },
};

export {BASE_URL, API_URLS};
