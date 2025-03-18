import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CheckBox} from '@rneui/base';
import {currentLanguage} from '../helpers/common';

interface CheckboxFieldProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string;
}

const Checkbox: React.FC<CheckboxFieldProps> = ({
  label,
  value,
  onChange,
  error,
}) => {
  return (
    <View
      style={[
        styles.container,
        currentLanguage() === 'ur' && styles.rtlLayout,
      ]}>
      <CheckBox
        title={label}
        checked={value}
        onPress={() => onChange(!value)}
        iconType="material-community"
        checkedIcon="checkbox-marked"
        uncheckedIcon="checkbox-blank-outline"
        textStyle={styles.checkboxLabel}
        containerStyle={styles.container}
        size={20}
        checkedColor="#9B1B1B"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    marginLeft: 7,
    width: '100%',
    marginTop: 5,
    marginBottom: 20,
  },
  rtlLayout: {
    direction: 'rtl',
  },

  checkboxLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4D4D4D',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -10,
    marginLeft: 8,
  },
  icon: {
    color: 'red',
  },
});

export default Checkbox;
