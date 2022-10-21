/* eslint-disable @typescript-eslint/naming-convention */
// noinspection JSUnusedGlobalSymbols
import type namespaces from '../assets/locales/namespaces';
import '@lomray/afterjs-helpers/typings/react-i18next';

declare module 'react-i18next' {
  type DefaultResourcesCustom = typeof namespaces;
  interface Resources extends DefaultResourcesCustom {}
}
