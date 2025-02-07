import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RootStackParamList} from '../types/navigation';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Cart'
>;
type Props = {
  navigation: LoginScreenNavigationProp;
};

const Cart: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#000',
  },
});

export default Cart;
