import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('register');
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};
