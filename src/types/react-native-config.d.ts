declare module 'react-native-config' {
  interface Env {
    GOOGLE_MAPS_API_KEY: string;
    SERVER_CHANGE_PASS: string;
    TEST_TOKEN: string;
    IMAGE_KEY: string;
  }

  const Config: Env;
  export default Config;
}
