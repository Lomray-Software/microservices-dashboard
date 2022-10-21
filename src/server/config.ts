import { getIosIcons, getManifestPath } from '@lomray/afterjs-helpers/server/tools/paths';
import type { IServerTranslationConfig } from '@lomray/afterjs-helpers/server/translation';
import LanguageNamespaces from '@assets/locales/namespaces';
import { APP_LANGUAGES, DEFAULT_APP_LANGUAGE, IS_PROD } from '@constants/index';
import i18n from '@services/localization';
import routes from '../routes';
import Document from './document';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST || '');
// get manifest.json name if exist
const manifestPath = getManifestPath(__dirname);
// get apple icons if exist (pwa)
const iosIcons = getIosIcons(__dirname);
const translationConfig: IServerTranslationConfig = {
  i18n,
  defaultLng: DEFAULT_APP_LANGUAGE,
  allLng: APP_LANGUAGES,
  nsLng: LanguageNamespaces,
  isProd: IS_PROD,
};

/**
 * Server render props
 */
const getRenderProps = () =>
  ({
    assets,
    chunks: assets,
    document: Document,
    routes,
  } as const);

export { getRenderProps, translationConfig, manifestPath, iosIcons };
