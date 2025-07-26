import i18next, { TFunction } from 'i18next';
import en from './locales/en.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: { translation: en },
  },
});

export const t: TFunction = i18next.t.bind(i18next);
