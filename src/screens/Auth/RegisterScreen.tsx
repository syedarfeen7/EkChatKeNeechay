import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller, FieldValues} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/navigation';
import {registerSchema} from '../../utils/validations';
import {useTranslation} from 'react-i18next';
import LanguageToggle from '../../components/LanguageToggle';
import InputField from '../../components/InputField';
import Checkbox from '../../components/Checkbox';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../app/store';
import {registerUserAPI} from '../../features/auth/authAPI';
import {currentLanguage} from '../../helpers/common';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

interface FormValues {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  termsAccepted: boolean;
}

const RegisterScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (payload: FormValues) => {
    dispatch(registerUserAPI({payload, navigation}));
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
            {t('register.register')}
          </Text>
          <Text
            style={[
              styles.text,
              currentLanguage() === 'ur' && {marginLeft: 'auto'},
            ]}>
            {t('register.yourAccount')}
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.container}>
        {renderInputField({
          control,
          name: 'firstName',
          errors,
          keyboardType: 'default',
          placeholder: 'Enter first name',
        })}
        {renderInputField({
          control,
          name: 'lastName',
          errors,
          keyboardType: 'default',
          placeholder: 'Enter last name',
        })}
        {renderInputField({
          control,
          name: 'email',
          errors,
          keyboardType: 'email-address',
          placeholder: 'Enter your email',
        })}
        <Controller
          name="phone"
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
              error={errors.phone?.message}
              countryCode="+92"
            />
          )}
        />

        <Controller
          name="termsAccepted"
          control={control}
          render={({field: {onChange, value}}) => (
            <Checkbox
              label={t('register.agreeToTerms')}
              value={value}
              onChange={onChange}
              error={errors.termsAccepted?.message}
            />
          )}
        />

        <Text
          style={styles.signUpText}
          onPress={() => navigation.navigate('Register')}>
          {t('register.link')}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <LinearGradient
            colors={['#9B1B1B', '#220F30']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.buttonGradient}>
            <Text style={styles.buttonText}>{t('register.button')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const renderInputField = ({
  control,
  errors,
  name,
  placeholder,
  keyboardType = 'default',
}: {
  control: any;
  errors: FieldValues;
  name: string;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}) => {
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <InputField
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={errorMessage}
        />
      )}
    />
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
  icon: {
    color: '#FFFFFF',
    fontSize: 38,
    marginBottom: 20,
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
  signUpText: {
    color: '#220F30',
    fontWeight: '500',
  },
});

export default RegisterScreen;
