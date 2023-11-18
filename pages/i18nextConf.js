import i18n from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "/public/assets/locales/en/translation.json";
import translationAR from "/public/assets/locales/ar/translation.json";
import translationFR from "/public/assets/locales/fr/translation.json";

const fallbackLng = ['en'];
const availableLanguages = ['en', 'ar', 'fr'];

const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  },
  fr: {
    translation: translationFR
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    resources,
    fallbackLng, // fallback language is english.
    detection: {
      checkWhitelist: true, // options for language detection
    },
    debug: false,
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
    saveMissing: true
  });

export default i18n;