import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import Home from '../screens/Home';

const Stack = createStackNavigator<RootStackParamList>();

const BottomTab = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
  </Stack.Navigator>
);

export default BottomTab;
