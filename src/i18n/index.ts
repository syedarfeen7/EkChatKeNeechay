import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en/translation.json';
import ur from './locales/ur/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: en},
    ur: {translation: ur},
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes strings
  },
});

export default i18n;
