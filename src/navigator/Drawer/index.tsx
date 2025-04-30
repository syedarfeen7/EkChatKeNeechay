// DrawerMenu.tsx
import React from 'react';
import {View, Image, I18nManager, TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import {Landing, SideBar} from '../../screens/index';
import {Images, Colors, Metrics} from '../../theme';
import styles from '../style';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomHeader = () => (
  <View style={styles.customHeaderView}>
    <Image
      source={Images.headerLogo}
      style={styles.headerLogoImage}
      resizeMode="contain"
    />
  </View>
);

const DrawerPosition = () => (I18nManager.isRTL ? 'right' : 'left');

const NotificationIcon = () => {
  //   const operatorUnread = useSelector(
  //     (state: any) => state.operatorNotifications.unread,
  //   );
  //   const merchantUnread = useSelector(
  //     (state: any) => state.merchantNotifications.unread,
  //   );
  //   const totalUnread = operatorUnread + merchantUnread;

  return (
    <View style={styles.customHeaderView}>
      <Image
        source={Images.call}
        style={styles.leftIcon}
        resizeMode="contain"
      />
    </View>
  );
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const ServiceOperatorScreens = () => {
  const navigation = useNavigation<NavigationProp>();

  const renderLeftMenuButton = () => (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{paddingHorizontal: 10}}>
      <Image
        source={Images.menu}
        style={{width: 24, height: 24}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: Colors.primary},
        headerTintColor: Colors.white,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="LandingPage"
        component={Landing}
        options={{
          headerTitle: () => <CustomHeader />,
          headerLeft: () => renderLeftMenuButton(),
          headerRight: () => <NotificationIcon />,
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerMenu = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <SideBar {...props} />}
      screenOptions={{
        drawerPosition: DrawerPosition(),
        drawerType: 'front',
        overlayColor: 'rgba(0, 0, 0, 0.3)',
        drawerStyle: {
          width: Metrics.screenWidth * 0.72,
        },
      }}>
      <Drawer.Screen
        name="so_dashboard"
        component={ServiceOperatorScreens}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerMenu;
