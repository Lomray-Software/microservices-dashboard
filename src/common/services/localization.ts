import i18n, { i18n as Ii18n } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import type { TFunction, Namespace, TFuncKey } from 'react-i18next';
import { APP_LANGUAGES, APP_OTHER_LANGUAGES } from '@constants/index';
import CustomPathDetector from '@helpers/client-path-custom-detector';

export type TranslationDictionary = TFuncKey<Namespace>;

interface ICustomI18n extends Omit<Ii18n, 't'> {
  t: TFunction<Namespace>;
}

const languageDetector = new LanguageDetector(null, {
  allowPath: APP_OTHER_LANGUAGES,
});

if (process && !process.release) {
  i18n.use(Backend).use(initReactI18next).use(languageDetector);
}

if (!i18n.isInitialized) {
  void i18n.init({
    debug: false,
    // fallbackLng: DEFAULT_APP_LANGUAGE, // this load en locale (see network) if current ru, this implemented in detectors
    keySeparator: false,
    load: 'languageOnly',
    defaultNS: 'translation',
    whitelist: APP_LANGUAGES,
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['path'],
    },
  });

  // Client side
  languageDetector.addDetector(CustomPathDetector);
}

export const getLngCode = (i18nInstance?: ICustomI18n): string =>
  (i18nInstance || i18n).language?.split('-')[0];

export default i18n as ICustomI18n;
