import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/navigation';
import {loginSchema} from '../../utils/validations';
import {useTranslation} from 'react-i18next';
import LanguageToggle from '../../components/LanguageToggle';
import InputField from '../../components/InputField';
import {useDispatch, useSelector} from 'react-redux';
import {loginUserAPI} from '../../features/auth/authAPI';
import {AppDispatch} from '../../app/store';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {currentLanguage} from '../../helpers/common';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

interface FormValues {
  phoneNumber: string;
}

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const {error} = useSelector((state: any) => state.auth);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (payload: FormValues) => {
    dispatch(loginUserAPI({payload, navigation}));
  };

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={['#9B1B1B', '#220F30']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}>
        <LanguageToggle />
        <View style={styles.topContaier}>
          <Icon
            name="opencart"
            size={20}
            style={[
              styles.icon,
              currentLanguage() === 'ur' && {transform: [{scaleX: -1}]},
            ]}
          />

          <Text
            style={[
              styles.text,
              currentLanguage() === 'ur' && {marginLeft: 'auto'},
            ]}>
            {t('login.hello')}
          </Text>
          <Text
            style={[
              styles.text,
              currentLanguage() === 'ur' && {marginLeft: 'auto'},
            ]}>
            {t('login.signin!')}
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.container}>
        <Controller
          name="phoneNumber"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <InputField
              iconName="phone"
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              maxLength={10}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.phoneNumber?.message || error}
              countryCode="+92"
            />
          )}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <LinearGradient
            colors={['#9B1B1B', '#220F30']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.buttonGradient}>
            <Text style={styles.buttonText}>{t('login.signin')}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.bottomText}>
          {t('login.dontHaveAnAccount')}{' '}
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate('Register')}>
            {t('login.signup')}
          </Text>
        </Text>
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
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -50,
    backgroundColor: '#FFFFFF',
  },
  button: {
    width: '80%',
    marginTop: 20,
    borderRadius: 30,
  },
  buttonGradient: {
    borderRadius: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 15,
    textTransform: 'uppercase',
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 38,
    marginBottom: 20,
  },
  topContaier: {
    paddingHorizontal: 25,
    paddingBottom: 100,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 28,
    letterSpacing: 1,
    fontWeight: '500',
  },
  bottomText: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
  },
  signUpText: {
    color: '#220F30',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
