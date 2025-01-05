import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CheckBox} from '@rneui/base';

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
    console.log(error)
  return (
    <View style={styles.container}>
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
        checkedColor="#05c3de"
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
    marginTop: -5,
    marginBottom: 20,
  },

  checkboxLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4D4D4D',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  icon: {
    color: 'red',
  },
});

export default Checkbox;
