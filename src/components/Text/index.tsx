import React from 'react';
import {
  Text as TextRN,
  TextProps as TextRNProps,
  TextStyle,
  StyleSheet,
} from 'react-native';
import {Fonts, Colors} from '../../theme';
import utils from '../../utils';
import {currentLang} from '../../i18n';

type FontType = keyof typeof Fonts.type;
type FontSize = keyof typeof Fonts.size;

interface CustomTextProps extends TextRNProps {
  color?: string;
  size?: FontSize | number;
  type?: FontType;
  textAlign?: TextStyle['textAlign'];
  alternate?: boolean;
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

const Text: React.FC<CustomTextProps> = ({
  style,
  color = 'primary',
  size = 'normal',
  type = 'AvenirNextRegular',
  textAlign = 'left',
  children,
  alternate = false,
  ...rest
}) => {
  const isRtlLang = (): boolean => {
    const locale = currentLang();
    return locale === 'ar' || locale === 'ur';
  };

  const textAlternateStyle: TextStyle = {
    textAlign: isRtlLang()
      ? utils.isPlatformAndroid()
        ? 'left'
        : 'right'
      : 'right',
  };

  const textRtlStyling: TextStyle = {
    textAlign: isRtlLang() ? 'left' : 'left',
  };

  const resolvedFontSize =
    typeof size === 'string' && Fonts.size[size]
      ? Fonts.size[size]
      : (size as number);

  const textStyle = StyleSheet.flatten([
    {
      textAlign,
      fontFamily: Fonts.type[type] ?? Fonts.type.AvenirNextRegular,
      fontSize: resolvedFontSize,
      color: Colors.text[color] ?? color,
      backgroundColor: Colors.transparent,
    },
    alternate ? textAlternateStyle : textRtlStyling,
    style,
  ]);

  return (
    <TextRN style={textStyle} {...rest}>
      {children}
    </TextRN>
  );
};

export default Text;
