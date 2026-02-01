import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import languagedetector from 'i18next-browser-languagedetector'
import HTTPApi from 'i18next-http-backend'

i18next
    .use(initReactI18next)
    .use(languagedetector)
    .use(HTTPApi)
    .init({
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })

export default i18next;