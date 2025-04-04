import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {RootStackParamList} from '../types/navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../app/store';
import {logout} from '../features/auth/authSlice';
import ProfileProgress from '../components/ProgressBar';
import {ScrollView} from 'react-native-gesture-handler';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Account'
>;
type Props = {
  navigation: LoginScreenNavigationProp;
};

const accountMenus = [
  {icon: 'person-outline', label: 'Profile', navigate: 'Profile'},
  {icon: 'cart-outline', label: 'My Orders', navigate: 'MyOrders'},
  {icon: 'heart-outline', label: 'Wishlist', navigate: 'Wishlist'},
  {icon: 'card-outline', label: 'Payment Methods', navigate: 'PaymentMethods'},
  {icon: 'location-outline', label: 'Address Book', navigate: 'Address'},
  {
    icon: 'lock-closed-outline',
    label: 'Security Settings',
    navigate: 'Profile',
  },
  {
    icon: 'pricetag-outline',
    label: 'Coupons & Offers',
    navigate: 'CoupnsOffers',
  },
  {icon: 'call-outline', label: 'Contact Support', navigate: 'Contact'},
  {icon: 'settings-outline', label: 'Settings', navigate: 'Settings'},
  {icon: 'log-out-outline', label: 'Logout', navigate: 'Logout'},
];

const IconComponent = Icon as unknown as React.FC<{
  name: string;
  size: number;
  style?: object;
  color?: string;
}>;

const Account: React.FC<Props> = ({navigation}) => {
  const [isSelected, setIsSelected] = useState<Number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: any) => state.auth.user);

  const handleActiveMenu = ({
    index,
    label,
    navigateTo,
  }: {
    index: number;
    label: string;
    navigateTo: string;
  }) => {
    setIsSelected(index);
    if (label === 'Logout') {
      dispatch(logout());
      navigation.navigate('Login');
    } else {
      navigation.navigate(navigateTo);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View>
          <Image
            source={{
              uri:
                user?.profileImage ||
                'https://randomuser.me/api/portraits/men/1.jpg',
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>
            {user?.firstName + ' ' + user?.lastName}
          </Text>
          <View style={styles.progressContainer}>
            <ProfileProgress
              user={{
                ...user,
              }}
            />
          </View>
        </View>

        <View>
          <TouchableOpacity style={styles.notificationIcon}>
            <IconComponent
              name="notifications-outline"
              size={24}
              color="#333"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.lineBreak} />
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.menuContainer}>
              {accountMenus.map((item, index) => {
                const selected = isSelected === index;
                const iconName = selected
                  ? item.icon.replace('-outline', '')
                  : item.icon;

                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.menuItem, selected && styles.selectedMenu]}
                    onPress={() =>
                      handleActiveMenu({
                        index,
                        label: item.label,
                        navigateTo: item?.navigate,
                      })
                    }>
                    <IconComponent
                      name={iconName}
                      size={22}
                      style={[styles.icon]}
                    />
                    <Text style={styles.menuText}>{item.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    padding: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  scrollContainer: {
    width: '100%',
  },
  progressContainer: {
    marginTop: 10,
  },
  lineBreak: {
    borderColor: '#ccc',
    borderWidth: 0.5,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  role: {
    fontSize: 14,
    color: '#777',
  },
  menuContainer: {
    paddingHorizontal: 15,
    overflow: 'scroll',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  selectedMenu: {
    backgroundColor: '#eee8',
    borderRadius: 20,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
    fontWeight: '700',
  },
  icon: {
    color: '#333',
  },
  notificationIcon: {
    // position: 'absolute',
    top: 0,
    right: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    width: 'auto',
  },
});

export default Account;
