import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import moment from 'moment';
import 'moment/locale/pt';
import { translations } from '@a12e/accessmonitor-rulesets';

import { enTranslation } from './locale/English';
import ptJSON from './locale/Portuguese.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { ...enTranslation.translation, ...translations.en.translation } },
    pt: { translation: { ...ptJSON.translation, ...translations.pt.translation } },
  },
  lng: 'pt',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

function updateMomentLocale() {
  moment.locale(i18n.language);
}

i18n.on('languageChanged', updateMomentLocale);
updateMomentLocale();
