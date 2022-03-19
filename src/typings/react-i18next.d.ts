/* eslint-disable @typescript-eslint/naming-convention */
import namespaces from '../assets/locales/namespaces';

declare module 'react-i18next' {
  type DefaultResourcesCustom = typeof namespaces;
  interface Resources extends DefaultResourcesCustom {}

  interface I18nextProviderProps {
    initialI18nStore?: any;
    initialLanguage?: string;
  }
}
