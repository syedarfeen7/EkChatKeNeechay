import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import {RootStackParamList} from '../types/navigation';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import OtpScreen from '../screens/Auth/OtpScreen';
import HomeScreen from '../screens/Auth/Home';

const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigation = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="OTP"
      component={OtpScreen}
      // options={{headerShown: false}}
    />
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default AuthNavigation;
