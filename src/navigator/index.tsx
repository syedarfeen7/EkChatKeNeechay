import React, {useEffect} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BackHandler} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Login} from '../screens';
import {Colors, Fonts} from '../theme';
// import {isAccepted} from '../helpers/DataHelper';
import Utils from '../utils';
import {RootStackParamList} from '../types/navigation';
import Verify from '../screens/Verify';
// import {isRTL, strings} from '../i18n';

const Stack = createNativeStackNavigator<RootStackParamList>();

const BACK_SCENES = ['landingPage', 'login', 'landingPageServiceProvider'];
const LOCK_BACK_SCENES = [
  'mywallet',
  'settings',
  'reminders',
  'walkInCustomer',
  'orderInfo',
];

const AppNavigator: React.FC = () => {
  const navigationRef =
    React.useRef<NavigationContainerRef<RootStackParamList>>(null);
  const {t} = useTranslation();

  // BackHandler handling with navigation
  useEffect(() => {
    const backAction = () => {
      const routeName = navigationRef.current?.getCurrentRoute()?.name ?? '';

      if (BACK_SCENES.includes(routeName)) {
        Utils.showYesNoMessage(
          'Confirm',
          'confirm app exit',
          () => BackHandler.exitApp(),
          () => {},
        );
        return true;
      }

      if (LOCK_BACK_SCENES.includes(routeName)) {
        return true;
      }

      navigationRef.current?.goBack();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => subscription.remove();
  }, [t]);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        ...DefaultTheme,
        colors: {...DefaultTheme.colors},
      }}>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {fontFamily: Fonts.type.AvenirNextDemiBold},
          headerTintColor: Colors.primary,
        }}
        initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Verify"
          component={Verify}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
