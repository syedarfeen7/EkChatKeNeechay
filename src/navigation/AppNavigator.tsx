import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import BottomTab from './BottomTabNavigaton';
import {useSelector} from 'react-redux';

const AppNavigator = () => {
  const isAuthenticated = useSelector(
    (state: any) => state?.auth?.isAuthenticated,
  );
  return (
    <NavigationContainer>
      {isAuthenticated ? <BottomTab /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigator;
