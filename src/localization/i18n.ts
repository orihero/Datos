import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

// Til fayllarini import qilish
import uz from './uz.json';
import ru from './ru.json';
import en from './en.json';

i18next
  .use(initReactI18next) // React bilan integratsiya qilish
  .init({
    compatibilityJSON: 'v3',
    resources: {
      uz: {translation: uz},
      ru: {translation: ru},
      en: {translation: en},
    },
    lng: 'uz', // Default til
    fallbackLng: 'en', // Zaxira tili
    interpolation: {
      escapeValue: false, // XSS hujumlarini oldini olish uchun
    },
  });

export default i18next;
