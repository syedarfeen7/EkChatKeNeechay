import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

interface SplashScreenProps {
  onComplete: () => void;
}

const IconComponent = Icon as unknown as React.FC<{
  name: string;
  size: number;
  style?: object;
}>;

const SplashScreen: React.FC<SplashScreenProps> = ({onComplete}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <LinearGradient
       colors={['#4286f4', '#373B44']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={styles.container}>
      <View style={styles.container}>
        <IconComponent name="opencart" size={20} style={styles.icon} />
        <Text style={styles.text}>#EkChatKeNeeche</Text>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 60,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 30,
    marginBottom: 20,
    marginTop: 10,
  },
});

export default SplashScreen;
