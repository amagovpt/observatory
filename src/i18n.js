import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from './locale/English.json'
import ptJSON from './locale/Portuguese.json'
import moment from 'moment';
import 'moment/locale/pt';
import {translations} from "@a12e/accessmonitor-rulesets";
i18n.use(initReactI18next).init({
 resources: {
    en: { translation: { ...enJSON.translation, ...translations.en.translation } },
    pt: { translation: { ...ptJSON.translation, ...translations.pt.translation } },
},
 lng: "pt",
});

function updateMomentLocale() {
    const currentLanguage = i18n.language;
    moment.locale(currentLanguage);
}

i18n.on('languageChanged', () => {
    updateMomentLocale();
});

updateMomentLocale();