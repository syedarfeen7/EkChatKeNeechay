import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface InputFieldProps {
  iconName?: string;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  maxLength?: number;
  value: string | undefined;
  error?: string | null;
  countryCode?: string;
  onChange: (text: string) => void;
  onBlur: () => void;
  containerStyle?: ViewStyle; // Specific type for containerStyle
  inputRef?: React.Ref<TextInput> | null;
  onKeyPress?: (e: any) => void;
  onPress?: (e: any) => void;
  otpContainer?: boolean;
  editable?: boolean;
}

const IconComponent = Icon as unknown as React.FC<{
  name: string;
  size: number;
  style: object;
}>;

const InputField: React.FC<InputFieldProps> = ({
  iconName,
  placeholder,
  keyboardType = 'default',
  maxLength,
  value,
  error,
  countryCode,
  onChange,
  onBlur,
  containerStyle,
  inputRef,
  onKeyPress,
  otpContainer,
  editable,
  onPress,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, otpContainer && styles.secondContainer]}>
      <View
        style={[
          styles.inputWrap,
          error && styles.errorInput,
          !error && isFocused && styles.focusedInput,
          containerStyle,
        ]}>
        {iconName && (
          <IconComponent name={iconName} size={20} style={styles.icon} />
        )}
        {countryCode && <Text style={styles.countryCode}>{countryCode}</Text>}
        <TextInput
          style={[
            styles.input,
            (!iconName || !countryCode) && styles.paddingLeft,
          ]}
          placeholderTextColor="#888"
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          value={value}
          onChangeText={onChange}
          onBlur={() => {
            onBlur();
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          ref={inputRef}
          onKeyPress={onKeyPress}
          editable={editable}
          onPress={onPress}
          {...rest}
        />
      </View>
      {error && (
        <Text style={[styles.errorText, otpContainer && styles.otpErrorText]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondContainer: {
    width: 'auto',
    justifyContent: 'flex-start',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 15,
  },
  paddingLeft: {
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
    color: '#9B1B1B',
  },
  countryCode: {
    fontSize: 16,
    color: '#808080',
    marginRight: 10,
    fontWeight: '700',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: -15,
    marginBottom: 15,
    width: '100%',
    marginLeft: 20,
  },
  otpErrorText: {
    width: 'auto',
    marginLeft: 0,
    marginTop: 0,
  },
  focusedInput: {
    borderColor: '#9B1B1B',
  },
});

export default InputField;
