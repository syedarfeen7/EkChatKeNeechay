import React, {ReactNode} from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Platform,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
  ViewStyle,
  StyleProp,
  Insets,
} from 'react-native';
import Util from '../../utils';
import {Colors} from '../../theme';

let disableClick = false;

const debounceTime =
  Platform.select({
    ios: 200,
    android: 900,
  }) ?? 200;

interface ButtonViewProps
  extends TouchableOpacityProps,
    TouchableNativeFeedbackProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  hitSlop?: Insets;
  onPress?: () => void;
}

export default class ButtonView extends React.PureComponent<ButtonViewProps> {
  static defaultProps = {
    style: {},
    hitSlop: {},
  };

  _onPress = () => {
    const {onPress} = this.props;

    if (Util.isJSDebugMode()) {
      onPress?.();
    } else {
      if (!disableClick) {
        disableClick = true;
        onPress?.();

        setTimeout(() => {
          disableClick = false;
        }, debounceTime);
      }
    }
  };

  render() {
    const {style, children, hitSlop, ...rest} = this.props;

    if (Util.isPlatformAndroid()) {
      return (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(Colors.transparent, false)}
          {...rest}
          onPress={this._onPress}
          hitSlop={hitSlop}>
          <View style={style}>{children}</View>
        </TouchableNativeFeedback>
      );
    }

    return (
      <TouchableOpacity
        style={style}
        {...rest}
        onPress={this._onPress}
        hitSlop={hitSlop}>
        {children}
      </TouchableOpacity>
    );
  }
}
