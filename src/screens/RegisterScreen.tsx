import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller, FieldValues} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import {registerSchema} from '../utils/validations';
import {useTranslation} from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';
import InputField from '../components/InputField';
import Checkbox from '../components/Checkbox';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../app/store';
import {registerUserAPI} from '../features/auth/authAPI';
import {currentLanguage} from '../helpers/common';
// import Dropdown from '../components/Dropdown';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

interface FormValues {
  // title: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  termsAccepted: boolean;
}

// const titleOptions = [
//   {
//     label: 'Mr',
//     value: 'Mr',
//   },
//   {
//     label: 'Mrs',
//     value: 'Mrs',
//   },
// ];

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
      <LanguageToggle />
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            currentLanguage() === 'ur' && styles.rtlLayout,
          ]}>
          {t('register.cretaAnAccount')}
        </Text>

        {/* <Controller
          name="title"
          control={control}
          render={({field: {value, onChange}}) => (
            <Dropdown
              options={titleOptions}
              placeholder="Title"
              value={value}
              onValueChange={onChange}
              error={errors.title?.message}
            />
          )}
        /> */}

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
              maxLength={9}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.phone?.message}
              countryCode="+966"
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
          style={styles.alreadyHaveAnAccount}
          onPress={() => navigation.navigate('Login')}>
          {t('register.link')}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>{t('register.button')}</Text>
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
  },
  title: {
    fontSize: 22,
    textTransform: 'uppercase',
    marginBottom: 20,
    width: '100%',
    color: '#000',
    fontWeight: '700',
  },
  rtlLayout: {
    textAlign: 'right',
    marginRight: 20,
    fontSize: 26,
  },
  alreadyHaveAnAccount: {
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

export default RegisterScreen;
