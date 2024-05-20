import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from './locale/English.json'
import ptJSON from './locale/Portuguese.json'
import moment from 'moment';
import 'moment/locale/pt';
i18n.use(initReactI18next).init({
 resources: {
    en: { ...enJSON },
    pt: { ...ptJSON },
},
 lng: "pt",
});

// Function to update Moment.js locale based on i18next language
function updateMomentLocale() {
    const currentLanguage = i18n.language;
    moment.locale(currentLanguage);
}

// Listen for language change
i18n.on('languageChanged', () => {
    updateMomentLocale();
});

// Initially set the locale
updateMomentLocale();