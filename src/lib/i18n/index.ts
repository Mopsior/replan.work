import { createIsomorphicFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import plTranslations from '@/locales/pl.json'

enum LANGUAGES {
    PL = 'pl',
}

export const resources = {
    pl: {
        translation: plTranslations,
    },
} as const

export const defaultNS = 'translation'

const i18nCookieName = 'i18nextLng'

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        defaultNS,
        fallbackLng: LANGUAGES.PL,
        supportedLngs: Object.values(LANGUAGES),
        detection: {
            order: ['cookie'],
            lookupCookie: i18nCookieName,
            caches: ['cookie'],
            cookieMinutes: 60 * 24 * 365,
        },
        interpolation: { escapeValue: false },
    })

export const setSSRLanguage = createIsomorphicFn().server(async () => {
    const language = getCookie(i18nCookieName) as LANGUAGES
    await i18n.changeLanguage(language)
})

export default i18n
