import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RootStackParamList} from '../types/navigation';
import SearchBarComponent from '../components/SearchBar';
import MyCarousel from '../components/Carousel';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
type Props = {
  navigation: LoginScreenNavigationProp;
};

const Home: React.FC<Props> = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      <SearchBarComponent onSearch={setSearchText} />
      <MyCarousel />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#000',
  },
});

export default Home;
