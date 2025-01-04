import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import {loginSchema} from '../utils/validations';
import {useTranslation} from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';
import images from '../asstes';
import {currentLanguage} from '../helpers/common';

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
  const [isFocused, setIsFocused] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log('Login data:', data);
    navigation.navigate('Home');
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
            <View
              style={[
                styles.phoneInputContainer,
                errors.phone && styles.errorInput,
                isFocused && styles.isFocusedStyle,
              ]}>
              <Icon name="phone" size={20} style={styles.phoneIcon} />
              <Text style={styles.countryCode}>+966</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                onChangeText={onChange}
                value={value}
                maxLength={9}
                onBlur={() => {
                  onBlur();
                  setIsFocused(false); // On blur, remove focus
                }}
                onFocus={() => setIsFocused(true)}
              />
            </View>
          )}
        />
        <Text
          style={styles.createAnAccount}
          onPress={() => navigation.navigate('Register')}>
          {t('register.link')}
        </Text>
        {errors.phone && (
          <Text style={styles.errorText}>{errors.phone.message}</Text>
        )}

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
    color: '#000',
  },
  logo: {
    width: 220,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  phoneIcon: {
    marginRight: 10,
    marginLeft: 10,
    color: '#05c3de',
  },
  countryCode: {
    fontSize: 16,
    color: '#808080',
    marginRight: 10,
    fontWeight: '700',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 15,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
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
  isFocusedStyle: {
    borderColor: '#05c3de',
  },
});

export default LoginScreen;
