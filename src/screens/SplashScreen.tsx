import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import images from '../asstes/index';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({onComplete}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <View style={styles.container}>
      <Image source={images.enLogo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Online Shop</Text>
      <Text style={styles.subTitle}>Easy Solution</Text>
      <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066b2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 170,
    marginLeft: 10,
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    padding: 5,
    letterSpacing: 2,
  },
  subTitle: {
    letterSpacing: 2,
    fontSize: 16,
    textTransform: 'uppercase',
    padding: 5,
    color: '#FFFFFF',
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
