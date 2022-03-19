import type { DetectorOptions } from 'i18next-browser-languagedetector';
import { DEFAULT_APP_LANGUAGE } from '@constants/index';

export default {
  name: 'path',

  lookup(options: DetectorOptions): string | undefined {
    let found;

    if (typeof window !== 'undefined') {
      const language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);

      if (language instanceof Array) {
        if (typeof options.lookupFromPathIndex === 'number') {
          if (typeof language[options.lookupFromPathIndex] !== 'string') {
            return undefined;
          }

          found = language[options.lookupFromPathIndex].replace('/', '');
        } else {
          found = language[0].replace('/', '');
        }
      }
    }

    if (!found || !options?.allowPath?.includes(found)) {
      // Simulate fallback lang
      found = DEFAULT_APP_LANGUAGE;
    }

    return found;
  },
};
