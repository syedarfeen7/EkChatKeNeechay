import * as RNLocalize from 'react-native-localize';

export const detectLanguage = (): string => {
  const locales = RNLocalize.getLocales();
  return locales?.[0]?.languageCode || 'en';
};
