const BASE_URL = 'https://cms-staging.carhubapp.com';
export const API = '/api';
export const stagingServerURL = 'https://cms-staging.carhubapp.com';
// export const devServerURL = "http://carhub-integeration.herokuapp.com";
export const devServerURL = 'https://carhub-revamp-dev.herokuapp.com';
export const devServerURL2 = 'https://carhub-revamp-dev.herokuapp.com';
export const devServerURL3 = 'https://cms-b2c-dev-578118eff2cb.herokuapp.com';
export const betaServerURL = 'http://beta2.carhubapp.com';
export const liveServerURL = 'https://cms.carhubapp.com';
export const localServer = 'http://192.168.0.219:8080';
export const defaultServer = stagingServerURL;

export const API_USER_NAME = '';
export const API_PASSWORD = '';
export const API_TIMEOUT = 45000;

const API_URLS = {
  AUTH: {
    REGISTER: `${BASE_URL}${API}/auth/register`,
  },
  USER: {
    LOGIN: `${BASE_URL}/auth/login`,
    UPLOAD: (userId: string) => `${BASE_URL}/users/upload/${userId}`,
  },
  SETTINGS: {
    APP_CONFIG: `${BASE_URL}${API}/settings`,
  },
};

export {BASE_URL, API_URLS};
