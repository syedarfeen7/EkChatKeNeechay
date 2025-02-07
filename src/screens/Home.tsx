import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RootStackParamList} from '../types/navigation';
import SearchBarComponent from '../components/SearchBar';
import MyCarousel, {IMAGE_HEIGHT} from '../components/Carousel';
import {useSelector} from 'react-redux';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
type Props = {
  navigation: LoginScreenNavigationProp;
};

const Home: React.FC<Props> = () => {
  const [searchText, setSearchText] = useState('');
  const user = useSelector((state: any) => state?.auth?.user);

  return (
    <View style={styles.container}>
      <SearchBarComponent onSearch={setSearchText} />

      <View style={{height: IMAGE_HEIGHT}}>
        <MyCarousel />
      </View>
      <View style={styles.categoriesWrapper}>
        <Text style={styles.title}>Welcome: {user?.firstName}</Text>
      </View>
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
    textAlign: 'center',
  },
  categoriesWrapper: {
    marginTop: -20,
  },
});

export default Home;
