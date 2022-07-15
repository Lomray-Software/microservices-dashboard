import { APP_LANGUAGES } from '@constants/index';
import type { TMenuValues } from '@constants/menu';
import MENU from '@constants/menu';

/**
 * Get current active menu item by url
 */
const getActiveMenu = (pathname: string): TMenuValues => {
  const [, lng, firstPart] = pathname.split('/');

  let url = lng;

  if (APP_LANGUAGES.includes(lng)) {
    url = firstPart;
  }

  // Direct match
  if (MENU?.[`/${url}`]) {
    return MENU?.[`/${url}`] as TMenuValues;
  }

  // Starts with match
  for (const path in MENU) {
    if (url.startsWith(path)) {
      return MENU[path] as TMenuValues;
    }
  }

  return MENU['/'] as TMenuValues;
};

export default getActiveMenu;
