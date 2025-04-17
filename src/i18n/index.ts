import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en/translation.json';
import ur from './locales/ur/translation.json';
import ar from './locales/ar/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: en},
    ur: {translation: ur},
    ar: {translation: ar},
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes strings
  },
});

export const i18nChangeLanguage = (language: string) => {
  i18n.changeLanguage(language);
};

export function isRTL(): boolean {
  return i18n.language === 'ar' || i18n.language === 'ur';
}

export function currentLang(): string {
  return i18n.language;
}
export function strings(key: string, params?: Record<string, any>): string {
  return i18n.t(key, params);
}

export default i18n;
