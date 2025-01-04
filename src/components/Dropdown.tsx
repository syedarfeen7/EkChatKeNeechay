import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface DropdownProps {
  options: {label: string; value: string}[];
  placeholder?: string;
  value: string;
  error?: string;
  iconName?: string;
  onValueChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Select an option',
  value,
  error,
  iconName,
  onValueChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.dropdownWrap,
          error && styles.errorInput,
          !error && isFocused && styles.focusedInput,
        ]}>
        {iconName && <Icon name={iconName} size={20} style={styles.icon} />}
        <Picker
          selectedValue={value}
          style={styles.picker}
          onValueChange={itemValue => {
            setIsFocused(false);
            onValueChange(itemValue);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}>
          <Picker.Item label={placeholder} value="" enabled={false} />
          {options.map(option => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  dropdownWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  picker: {
    flex: 1,
    color: '#333',
  },
  icon: {
    marginRight: 10,
    color: '#05c3de',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  focusedInput: {
    borderColor: '#05c3de',
  },
});

export default Dropdown;
