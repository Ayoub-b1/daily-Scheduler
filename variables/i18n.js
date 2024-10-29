import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules'; // Include the polyfill
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your language files
import enTranslation from '../locales/en.json';
import frTranslation from '../locales/fr.json';
import esTranslation from '../locales/es.json';
import arTranslation from '../locales/ar.json';

// Initialize i18next
i18n
  .use(initReactI18next) // Bind react-i18next to i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      fr: {
        translation: frTranslation,
      },
      es: {
        translation: esTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    compatibilityJSON: 'v3', // Fallback mode for older environments
  });

// Function to get the saved language from AsyncStorage and set it in i18n
const setInitialLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  } catch (error) {
    console.error('Error fetching language from AsyncStorage:', error);
  }
};

// Call the function to set the initial language
setInitialLanguage();

export default i18n;
