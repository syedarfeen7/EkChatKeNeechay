import React, {ReactNode} from 'react';
import {View, ViewStyle, StyleProp} from 'react-native';

import {Colors} from '../../theme';
import {Text, ButtonView} from '../../components';
import Util from '../../utils';
import styles from './style';

interface CarhubButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  text?: string;
  bordered?: boolean;
  isDisable?: boolean;
  renderRight?: () => ReactNode;
  renderLeft?: () => ReactNode;
}

const CarhubButton: React.FC<CarhubButtonProps> = ({
  containerStyle,
  onPress = () => {},
  text = '',
  bordered = false,
  isDisable = false,
  renderRight,
  renderLeft,
}) => {
  let btnTextColor: string;
  let style: ViewStyle = {};
  let textStyle: {color: string} = {color: ''};

  if (bordered) {
    btnTextColor = Colors.darkStaleBlue;
    style = {...styles.borderedButton};
  } else {
    btnTextColor = 'white';
    style = {...styles.button};
  }

  textStyle.color = btnTextColor;

  if (isDisable) {
    style.backgroundColor = (style.backgroundColor || '') + '50';
    textStyle.color = Colors.text.dis;

    if (Util.isPlatformAndroid()) {
      style.opacity = 0.7;
    }
  }

  return (
    <ButtonView
      style={[style, containerStyle]}
      onPress={isDisable ? () => {} : onPress}>
      {renderLeft && (
        <View style={{opacity: isDisable ? 0.5 : 1}}>{renderLeft()}</View>
      )}
      <Text type="AvenirNextDemiBold" size="fourteen" style={textStyle}>
        {text}
      </Text>
      {renderRight && (
        <View style={{opacity: isDisable ? 0.5 : 1}}>{renderRight()}</View>
      )}
    </ButtonView>
  );
};

export default CarhubButton;
