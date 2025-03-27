import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {RootStackParamList} from '../../types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Controller, FieldValues, useForm} from 'react-hook-form';
import InputField from '../../components/InputField';
import {yupResolver} from '@hookform/resolvers/yup';
import {updateProfileSchema} from '../../utils/validations';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {updateUserAPI} from '../../features/user/userAPI';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Edit_Profile'
>;
type Props = {
  navigation: ProfileScreenNavigationProp;
};

interface FormValues {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  address: string;
  id: string;
}

const Profile: React.FC<Props> = ({}) => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      address: user?.address || '',
    },
  });

  console.log(user);

  const onSubmit = (payload: FormValues) => {
    dispatch(updateUserAPI({payload, id: user?._id}));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={['#9B1B1B', '#220F30']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={styles.gradient}
          />
          <View style={[styles.container, styles.borderRadius]}>
            <TouchableOpacity style={styles.imageContainer}>
              <Image
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/1.jpg',
                }}
                style={styles.profileImage}
              />
              <View style={styles.cameraIcon}>
                <Icon name="camera" size={22} color="#0008" />
              </View>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              {renderInputField({
                control,
                name: 'firstName',
                errors,
                keyboardType: 'default',
                placeholder: 'Enter first name',
                label: 'First Name',
              })}
              {renderInputField({
                control,
                name: 'lastName',
                errors,
                keyboardType: 'default',
                placeholder: 'Enter last name',
                label: 'Last Name',
              })}
              {renderInputField({
                control,
                name: 'email',
                errors,
                keyboardType: 'email-address',
                placeholder: 'Enter your email',
                label: 'Email',
              })}
              <View>
                <Text style={styles.label}>Phone number</Text>
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
                      error={errors.phoneNumber?.message}
                      countryCode="+92"
                      editable={false}
                    />
                  )}
                />
              </View>
              {renderInputField({
                control,
                name: 'address',
                errors,
                keyboardType: 'default',
                placeholder: 'Enter your address',
                label: 'Address',
              })}

              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(onSubmit)}>
                <LinearGradient
                  colors={['#9B1B1B', '#220F30']}
                  start={{x: 0.3, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={styles.buttonGradient}>
                  <Text style={styles.buttonText}>Update</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const renderInputField = ({
  control,
  errors,
  name,
  placeholder,
  keyboardType = 'default',
  label,
}: {
  control: any;
  errors: FieldValues;
  name: string;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  label: string;
}) => {
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Controller
        name={name}
        control={control}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <InputField
              placeholder={placeholder}
              keyboardType={keyboardType}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errorMessage}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  borderRadius: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
  },
  gradient: {
    height: 170,
  },
  imageContainer: {
    width: 140,
    height: 140,
    marginTop: -80,
  },
  scrollContainer: {
    width: '100%',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#FFFFFF',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#FFFFFF',
    color: '#ddd',
    padding: 5,
    borderRadius: 15,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    marginBottom: 3,
    marginLeft: 8,
    fontWeight: '700',
  },
  button: {
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
    paddingHorizontal: 60,
    textTransform: 'uppercase',
  },
});

export default Profile;
