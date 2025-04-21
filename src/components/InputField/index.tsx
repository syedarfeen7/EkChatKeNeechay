import React, {forwardRef} from 'react';
import {
  View,
  TextInput,
  Image as RNImage,
  TextInputProps,
  Platform,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';

import {Text, ButtonView} from '../../components';
import {Metrics, Colors} from '../../theme';
// import utils from '../../utils';
import styles from './style';

interface InputFieldProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  editable?: boolean;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  returnKeyType?: TextInputProps['returnKeyType'];
  keyboardType?: TextInputProps['keyboardType'];
  renderExtraContent?: () => React.ReactNode;
  notShowSeparator?: boolean;
  isNumber?: boolean;
  isRequired?: boolean;
  error?: string;
  editImageIcon?: ImageSourcePropType;
  onEditPress?: () => void;
  buttonViewStyle?: ViewStyle;
  multiline?: boolean;
}

const InputField = forwardRef<TextInput, InputFieldProps>((props, ref) => {
  const {
    editable = true,
    onChangeText,
    onSubmitEditing,
    value,
    placeholder,
    label,
    returnKeyType = 'next',
    keyboardType,
    renderExtraContent,
    notShowSeparator,
    isNumber,
    isRequired,
    error,
    editImageIcon,
    onEditPress,
    buttonViewStyle,
    multiline = false,
    ...rest
  } = props;

  const renderEditButton = () => {
    if (!onEditPress || !editImageIcon) {
      return null;
    }

    const buttonStyle = isNumber
      ? [styles.inputIcon, buttonViewStyle, {marginRight: Metrics.ratio(0)}]
      : [styles.inputIcon, buttonViewStyle];

    return (
      <ButtonView style={buttonStyle} onPress={onEditPress}>
        <RNImage style={styles.inputIconImage} source={editImageIcon} />
      </ButtonView>
    );
  };

  const renderSeperator = () => <View style={styles.seperator} />;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <TextInput
            {...rest}
            ref={ref}
            editable={editable}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            value={value}
            placeholder={placeholder}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
            maxHeight={
              Platform.OS === 'android' ? Metrics.ratio(100) : Metrics.ratio(35)
            }
            keyboardType={keyboardType}
            style={[styles.input]}
            selectionColor="#e89225"
            underlineColorAndroid="transparent"
            placeholderTextColor={Colors.punch}
            returnKeyType={returnKeyType}
            enablesReturnKeyAutomatically
          />
          {renderExtraContent && renderExtraContent()}
          {renderEditButton()}
        </View>

        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flexDirection: 'row',
            paddingLeft: isNumber ? Metrics.ratio(40) : 0,
            width: Metrics.screenWidth - Metrics.ratio(20 * 2),
          }}>
          <Text style={styles.label}>{label}</Text>
          {isRequired && <Text style={styles.requiredSign}>*</Text>}
        </View>
      </View>

      {!notShowSeparator && renderSeperator()}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
});

export default InputField;
