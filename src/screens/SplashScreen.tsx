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
      <Text style={styles.title}>Welcome to Autohub</Text>
      <ActivityIndicator size="large" color="#05c3de" style={styles.loader} />
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
  logo: {
    width: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#000',
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
