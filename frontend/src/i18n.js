import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translations
import en from './locales/en/translation.json';
import ar from './locales/ar/translation.json';

i18n
  .use(initReactI18next) // initializes react-i18next
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language in case of missing translations
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
