import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import {loginSchema} from '../utils/validations';
import {useTranslation} from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';
import images from '../asstes';
import {currentLanguage} from '../helpers/common';
import InputField from '../components/InputField';
import {useDispatch} from 'react-redux';
import {loginUserAPI} from '../features/auth/authAPI';
import {AppDispatch} from '../app/store';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

interface FormValues {
  phone: string;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log('Login data:', data);
    dispatch(loginUserAPI(data));
    navigation.navigate('OTP');
  };

  return (
    <View style={styles.mainContainer}>
      <LanguageToggle />
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            source={currentLanguage() === 'en' ? images.enLogo : images?.arLogo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>{t('login.title')}</Text>
        </View>

        <Controller
          name="phone"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <InputField
              iconName="phone"
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              maxLength={9}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.phone?.message}
              countryCode="+966"
            />
          )}
        />
        <Text
          style={styles.createAnAccount}
          onPress={() => navigation.navigate('Register')}>
          {t('login.link')}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>{t('login.title')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    textTransform: 'uppercase',
    marginBottom: 20,
    width: '100%',
    textAlign: 'center',
    color: 'darkgary',
    fontWeight: '700',
  },
  logo: {
    width: 220,
    marginBottom: 20,
  },
  createAnAccount: {
    textDecorationLine: 'underline',
    color: '#05c3de',
  },
  button: {
    backgroundColor: '#ffb71b',
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    width: 250,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
