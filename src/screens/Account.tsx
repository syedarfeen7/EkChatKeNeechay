import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {RootStackParamList} from '../types/navigation';
import Icon from 'react-native-vector-icons/Ionicons';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Account'
>;
type Props = {
  navigation: LoginScreenNavigationProp;
};

const accountMenus = [
  {icon: 'person-outline', label: 'Profile'},
  {icon: 'cart-outline', label: 'My Orders'},
  {icon: 'heart-outline', label: 'Wishlist'},
  {icon: 'card-outline', label: 'Payment Methods'},
  {icon: 'location-outline', label: 'Address Book'},
  {icon: 'lock-closed-outline', label: 'Security Settings'},
  {icon: 'pricetag-outline', label: 'Coupons & Offers'},
  {icon: 'call-outline', label: 'Contact Support'},
  {icon: 'settings-outline', label: 'Settings'},
  {icon: 'log-out-outline', label: 'Logout'},
];

const Account: React.FC<Props> = () => {
  const [isSelected, setIsSelected] = useState<Number | null>(null);
  const handleActiveMenu = (index: Number) => {
    setIsSelected(index);
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
            style={styles.avatar}
          />
          <Text style={styles.name}>Daniel</Text>
          <Text style={styles.role}>UX/UI Designer</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Icon name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.lineBreak} />
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
              onPress={() => handleActiveMenu(index)}>
              <Icon name={iconName} size={22} style={[styles.icon]} />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
  },
  lineBreak: {
    borderColor: '#ccc',
    borderWidth: 0.5,
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
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
  },
  icon: {
    color: '#333',
  },
  notificationIcon: {
    position: 'absolute',
    top: 0,
    right: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
});

export default Account;
