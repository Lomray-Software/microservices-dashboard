import ROUTES from '@constants/routes';

/**
 * Site menu
 * Automatically works with:
 */
const MENU = {
  [ROUTES.HOME]: { titleKey: 'home' },
} as const;

export type TMenuLinks = keyof typeof MENU;

export type TMenuValues = typeof MENU[TMenuLinks];

export type TMenuTitleKeys = typeof MENU[TMenuLinks]['titleKey'];

export default MENU as Record<
  TMenuLinks,
  { titleKey: TMenuTitleKeys; hasFlashingPoint?: boolean; disableInFooter?: boolean }
>;
