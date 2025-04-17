import React from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors, Metrics} from '../../theme';
import {ButtonView} from '../../components';
import styles from './styles';
import {RootState} from '../../app/store';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isDisable?: boolean;
  onPress: (lang: string) => void;
};

const LangChangeButton: React.FC<Props> = ({
  containerStyle = {},
  buttonStyle = {},
  textStyle = {},
  isDisable = false,
  onPress,
}) => {
  const localeSettings = useSelector((state: RootState) => state.language);

  const languages = [
    {key: 'en', lang: 'English'},
    {key: 'ur', lang: 'اردو'},
    {key: 'ar', lang: 'العربية'},
  ];

  console.log('>>> localeSettings', localeSettings);

  return (
    <View style={[containerStyle]}>
      {languages.map((val, index) => {
        const activeLanguage = localeSettings.selectedLanguage === val.key;

        return (
          <ButtonView
            key={index.toString()}
            activeOpacity={activeLanguage ? 0.5 : 1}
            disabled={activeLanguage || isDisable}
            style={[
              activeLanguage
                ? styles.languageBtnActive
                : styles.languageBtnDeactive,
              buttonStyle,
            ]}
            onPress={() => onPress(val.key)}>
            <View style={styles.langOption}>
              <Text
                style={[
                  activeLanguage ? styles.activeText : styles.deActiveText,
                  textStyle,
                ]}>
                {val.lang}
              </Text>
            </View>

            {(val.key === 'ur' && localeSettings.selectedLanguage === 'en') ||
            (val.key === 'en' && localeSettings.selectedLanguage === 'ar') ? (
              <View
                style={{
                  width: Metrics.ratio(2),
                  height: Metrics.ratio(20),
                  backgroundColor: Colors.darkStaleBlue,
                }}
              />
            ) : null}
          </ButtonView>
        );
      })}
    </View>
  );
};

export default LangChangeButton;
