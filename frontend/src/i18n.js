import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import uzTranslations from './locales/uz.json';
import ruTranslations from './locales/ru.json';

const resources = {
  en: { translation: enTranslations },
  uz: { translation: uzTranslations },
  ru: { translation: ruTranslations }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
