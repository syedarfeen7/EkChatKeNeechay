import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Account from '../screens/Account';
import Profile from '../screens/Account/Profile';

type AccountStackParamList = {
  Account: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<AccountStackParamList>();

const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default AccountStack;
