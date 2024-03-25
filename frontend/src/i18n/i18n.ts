/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import EN from 'src/locales/locales.en.json'
import VI from 'src/locales/locales.vi.json'

export const resources = {
  en: {
    translation: EN
  },
  vi: {
    translation: VI
  }
}

export const defaultNS = 'translation'

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi', //default
  ns: ['translation'],
  fallbackLng: 'vi', //trong truong hop khong xac dinh duoc ngon ngu,
  interpolation: {
    escapeValue: false // react already safes from xss
  },
  defaultNS: defaultNS
})

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}
