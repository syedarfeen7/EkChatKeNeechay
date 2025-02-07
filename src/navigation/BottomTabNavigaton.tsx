import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import Messages from '../screens/Messages';
import Cart from '../screens/Cart';
import Account from '../screens/Account';

// Define type for route names
type TabParamList = {
  Home: undefined;
  Account: undefined;
  Messages: undefined;
  Cart: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Define a function to return the correct icon based on the route name
const getTabBarIcon = (route: string, color: string, size: number) => {
  let iconName: string;
  switch (route) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Account':
      iconName = 'person-circle';
      break;
    case 'Messages':
      iconName = 'chatbubble';
      break;
    case 'Cart':
      iconName = 'cart';
      break;
    default:
      iconName = 'help-circle-sharp';
  }
  return <Icon name={iconName} size={size} color={color} />;
};

// Define the screen options separately
const screenOptions = ({
  route,
}: {
  route: RouteProp<TabParamList, keyof TabParamList>;
}): BottomTabNavigationOptions => ({
  tabBarIcon: ({color, size}) => getTabBarIcon(route.name, color, size),
  tabBarShowLabel: true, // Show labels
  tabBarActiveTintColor: '#2980b9',
  tabBarInactiveTintColor: '#8e8e93',
  tabBarStyle: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 60,
    paddingBottom: 5,
  },
  headerShown: false,
});

const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{tabBarLabel: 'Messages'}}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{tabBarLabel: 'Cart'}}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{tabBarLabel: 'Account'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
