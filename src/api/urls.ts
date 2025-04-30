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
export const local = 'http://192.168.100.42:8080';
// const BASE_URL = 'https://cms-staging.carhubapp.com';
const BASE_URL = local;

export const API_USER_NAME = '';
export const API_PASSWORD = '';
export const API_TIMEOUT = 45000;

const API_URLS = {
  AUTH: {
    REGISTER: `${BASE_URL}${API}/auth/register`,
    REGISTER_PROVIDER: `${BASE_URL}${API}/cms/register/shop`,
  },
  USER: {
    LOGIN: `${BASE_URL}${API}/auth/login`,
    UPLOAD: (userId: string) => `${BASE_URL}/users/upload/${userId}`,
  },
  SETTINGS: {
    APP_CONFIG: `${BASE_URL}${API}/settings`,
  },
  UPLOAD: {
    SINGLE_FILE: `${BASE_URL}${API}/util/upload`,
    MULTIPLE_FILES: `${BASE_URL}${API}/util/upload/multi`,
  },
};

export {BASE_URL, API_URLS};
