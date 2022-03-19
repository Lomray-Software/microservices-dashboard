import { APP_OTHER_LANGUAGES, IS_TRANSLATE } from '@constants/index';

/**
 * Remove language prefix from url
 */
const removeLanguagePrefix = (url: string): string => {
  if (IS_TRANSLATE) {
    const isUrlContainLngPrefix = APP_OTHER_LANGUAGES.some((lng) => url.startsWith(`/${lng}`));

    // build path without language prefix
    if (isUrlContainLngPrefix) {
      return `/${url.split('/').splice(2).join('/')}`;
    }
  }

  return url;
};

export default removeLanguagePrefix;
