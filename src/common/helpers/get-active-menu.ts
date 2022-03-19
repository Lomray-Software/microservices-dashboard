import { APP_LANGUAGES } from '@constants/index';
import MENU, { TMenuValues } from '@constants/menu';

/**
 * Get current active menu item by url
 */
const getActiveMenu = (pathname: string): TMenuValues => {
  const [, lng, firstPart] = pathname.split('/');

  let key = lng;

  if (APP_LANGUAGES.includes(lng)) {
    key = firstPart;
  }

  return (MENU?.[`/${key}`] ?? MENU['/']) as TMenuValues;
};

export default getActiveMenu;
