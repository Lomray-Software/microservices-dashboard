/* eslint-disable @typescript-eslint/naming-convention */
import Cookies from 'universal-cookie';
import i18n from '@services/localization';

declare module 'express' {
  export interface Request {
    i18n: typeof i18n;
    universalCookies?: Cookies;
  }
}
