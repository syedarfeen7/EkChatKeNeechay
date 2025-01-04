import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import {registerSchema} from '../utils/validations';
import {useTranslation} from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';
import InputField from '../components/InputField';
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
  email: string | undefined;
  phone: string;
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

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log('Login data:', data);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.mainContainer}>
      <LanguageToggle />
      <View style={styles.container}>
        <Text style={styles.title}>{t('register.cretaAnAccount')}</Text>

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
          keyboardType: 'numeric',
          placeholder: 'Enter first name',
        })}
        {renderInputField({
          control,
          name: 'lastName',
          errors,
          keyboardType: 'numeric',
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
  errors: any;
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
