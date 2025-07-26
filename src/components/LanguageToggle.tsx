import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {useTranslation} from 'react-i18next';
import {currentLanguage} from '../helpers/common';

const LanguageToggle: React.FC = () => {
  const {i18n} = useTranslation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <View>
      <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
        <TouchableOpacity
          style={[
            styles.button,
            currentLanguage() === 'en' && styles.activeButton,
            styles.enButton,
          ]}
          onPress={() => handleLanguageChange('en')}>
          <Text
            style={[
              styles.text,
              currentLanguage() === 'en' && styles.activeText,
            ]}>
            English
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            currentLanguage() === 'ur' && styles.activeButton,
            styles.arButton,
          ]}
          onPress={() => handleLanguageChange('ur')}>
          <Text
            style={[
              styles.text,
              currentLanguage() === 'ur' && styles.activeText,
            ]}>
            اردو
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    direction: 'ltr',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#4286f4',
  },
  enButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  arButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  activeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4286f4',
  },
  activeText: {
    color: '#4286f4',
  },
});

export default LanguageToggle;
