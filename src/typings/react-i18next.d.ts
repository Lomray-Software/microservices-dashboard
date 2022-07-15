/* eslint-disable @typescript-eslint/naming-convention */
// noinspection JSUnusedGlobalSymbols

import type { ReactNode } from 'react';
import type namespaces from '../assets/locales/namespaces';

declare module 'react-i18next' {
  type DefaultResourcesCustom = typeof namespaces;
  interface Resources extends DefaultResourcesCustom {}

  export interface I18nextProviderProps {
    initialI18nStore?: any;
    initialLanguage?: string;
    children?: ReactNode;
  }
}
