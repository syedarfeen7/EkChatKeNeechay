import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RootStackParamList} from '../types/navigation';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
type Props = {
  navigation: LoginScreenNavigationProp;
};

const Home: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
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

export default Home;
