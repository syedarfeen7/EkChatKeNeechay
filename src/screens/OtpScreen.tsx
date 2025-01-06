import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import InputField from '../components/InputField';
import {useTranslation} from 'react-i18next';
import {otpSchema} from '../utils/validations';
import LanguageToggle from '../components/LanguageToggle';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../app/store';
import {otpVerificationAPI} from '../features/auth/authAPI';
import {RootStackParamList} from '../types/navigation';
import {StackNavigationProp} from '@react-navigation/stack';

interface FormValues {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
}

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OTP'>;
type Props = {
  navigation: LoginScreenNavigationProp;
};

const OtpScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const refs = useRef<(TextInput | null)[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const {otp, user} = useSelector((state: any) => state.auth);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(otpSchema),
  });

  const onSubmit = (data: FormValues) => {
    const otpVerify = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}${data.otp5}`;
    dispatch(
      otpVerificationAPI({
        payload: {
          otp: otpVerify,
        },
        otp,
        user,
        navigation,
      }),
    );
  };

  console.log('>>> user', user);

  const handleInputChange = (
    value: string,
    index: number,
    onChange: (value: string) => void,
  ) => {
    onChange(value);

    if (value && index < refs.current.length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !e.target.value) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <LanguageToggle />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{t('otp.title')}</Text>
        <Text style={styles.message}>{t('otp.message')}</Text>
        <View style={styles.otpContainer}>
          {Array.from({length: 5}).map((_, index) => (
            <Controller
              key={`otp${index + 1}`}
              name={`otp${index + 1}` as keyof FormValues}
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  placeholder=""
                  value={value}
                  onChange={(text: string) =>
                    handleInputChange(text, index, onChange)
                  }
                  onBlur={onBlur}
                  keyboardType="numeric"
                  maxLength={1}
                  error={errors[`otp${index + 1}`]?.message}
                  containerStyle={styles.squareInput}
                  otpContainer={true}
                  inputRef={(ref: TextInput | null) =>
                    (refs.current[index] = ref)
                  }
                  onKeyPress={(e: any) => handleKeyPress(e, index)}
                />
              )}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>{t('otp.verify')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  message: {
    marginBottom: 30,
    fontSize: 18,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  squareInput: {
    width: 50,
    height: 50,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 8,
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#05c3de',
    padding: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OtpScreen;
