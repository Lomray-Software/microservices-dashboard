import { mdiAccountCowboyHatOutline, mdiChessRook } from '@mdi/js';
import ROUTES from '@constants/routes';

/**
 * Site menu
 * Automatically works with:
 */
const MENU = {
  [ROUTES.HOME]: { titleKey: 'home', icon: { src: mdiChessRook, color: 'orange' } },
  [ROUTES.USERS]: { titleKey: 'users', icon: { src: mdiAccountCowboyHatOutline, color: 'green' } },
} as const;

export type TMenuLinks = keyof typeof MENU;

export type TMenuValues = typeof MENU[TMenuLinks];

export type TMenuTitleKeys = typeof MENU[TMenuLinks]['titleKey'];

export default MENU as Record<
  TMenuLinks,
  {
    titleKey: TMenuTitleKeys;
    icon: { src: string; color: string };
  }
>;
