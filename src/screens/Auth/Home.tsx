import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/navigation';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import LanguageToggle from '../../components/LanguageToggle';

type AuthHomeScreenNavigation = StackNavigationProp<
  RootStackParamList,
  'AuthHome'
>;

type Props = {
  navigation: AuthHomeScreenNavigation;
};

const IconComponent = Icon as unknown as React.FC<{
  name: string;
  size: number;
  style?: object;
  color?: string;
}>;

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const handleNavigation = (to: string) => navigation.navigate(to);

  return (
    <LinearGradient
      colors={['#9B1B1B', '#220F30']}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={styles.container}>
      <View style={styles.languageBtn}>
        <LanguageToggle />
      </View>
      <View style={styles.childContainer}>
        <View>
          <IconComponent name="opencart" size={20} style={styles.icon} />
          <Text style={styles.logoText}>#EkChatKeNeeche</Text>
        </View>

        <View>
          <Text style={styles.text}>{t('authHome.welcomeBack')}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation('Login')}>
            <Text style={styles.buttonText}>{t('login.signin')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.signUp]}
            onPress={() => handleNavigation('Register')}>
            <Text style={[styles.buttonText, styles.signUpText]}>
              {t('register.signup')}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.singinWith}>{t('authHome.signinWith')}</Text>
          <View style={styles.iconsWrapper}>
            <IconComponent
              name="google"
              size={20}
              style={styles.signinWithIcon}
            />
            <IconComponent
              name="facebook"
              size={20}
              style={styles.signinWithIcon}
            />
            <IconComponent
              name="twitter"
              size={20}
              style={styles.signinWithIcon}
            />
          </View>
        </View>
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
  childContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  languageBtn: {
    marginLeft: 'auto',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 20,
  },
  logoText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 35,
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 30,
    marginVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontWeight: 600,
    paddingVertical: 12,
  },
  signUp: {
    backgroundColor: '#FFFFFF',
  },
  signUpText: {
    color: '#000',
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 60,
    margin: 'auto',
  },
  iconsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  singinWith: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 20,
  },
  signinWithIcon: {
    fontSize: 24,
    width: 35,
    height: 35,
    lineHeight: 35,
    color: '#9B1B1B',
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  },
});

export default HomeScreen;
