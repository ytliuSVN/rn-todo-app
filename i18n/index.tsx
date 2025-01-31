import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './locales/en-US/translation.json';
import translationJa from './locales/ja-JP/translation.json';

// Define available language resources
const resources = {
  'en-US': { translation: translationEn },
  'ja-JP': { translation: translationJa },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: 'ja-JP',
  // lng: 'en-US',
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;