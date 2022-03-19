import express, { Express, Handler, Request, Response } from 'express';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import LanguageNamespaces from '@assets/locales/namespaces';
import { APP_LANGUAGES, APP_OTHER_LANGUAGES, IS_PROD } from '@constants/index';
import resolveAppPath from '@server-tools/resolve-app-path';
import CustomPathDetector from '@server-tools/server-path-custom-detector';
import i18n from '@services/localization';

/**
 * This file contains config translation for server side
 */

const localesSrc = resolveAppPath(IS_PROD ? 'build/public' : 'src/assets');

const lngDetector = new i18nextMiddleware.LanguageDetector(null, {
  allowPath: APP_OTHER_LANGUAGES,
});

const backendLocalesPaths = {
  loadPath: `${localesSrc}/locales/{{lng}}/{{ns}}.json`,
  addPath: `${localesSrc}/locales/{{lng}}/{{ns}}.missing.json`,
};

/**
 * Only for SSR
 */
const initServerTranslation = (server: Express): Promise<Handler> =>
  new Promise((resolve, reject) => {
    i18n
      .use(Backend)
      .use(lngDetector)
      .init(
        {
          preload: APP_LANGUAGES,
          ns: Object.keys(LanguageNamespaces),
          backend: backendLocalesPaths,
        },
        () => {
          // do not move this line
          lngDetector.addDetector(CustomPathDetector);

          /**
           * Use static locales' endpoint
           * NOTE: it should use before RAZZLE static middleware
           */
          server.use('/locales', express.static(`${localesSrc}/locales`));

          /**
           * Add i18n middleware for detect request locale
           * NOTE: it should use after all static middlewares
           */
          resolve(i18nextMiddleware.handle(i18n));
        },
      )
      .catch((e) => reject(e));
  });

/**
 * Only for SSG mode
 */
const applySSGTranslation = async (req: Request, res: Response): Promise<void> => {
  // find request language by request url
  const lng = CustomPathDetector.lookup(req, res, {
    lookupFromPathIndex: 0,
    allowPath: APP_OTHER_LANGUAGES,
    getOriginalUrl: (r: Request) => r.url,
  });

  await i18n.use(Backend).init({
    preload: APP_LANGUAGES,
    ns: Object.keys(LanguageNamespaces),
    backend: backendLocalesPaths,
  });
  await i18n.changeLanguage(lng);

  req.i18n = i18n;
};

export { initServerTranslation, applySSGTranslation };
