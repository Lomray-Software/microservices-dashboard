/* eslint-disable import/prefer-default-export,@typescript-eslint/naming-convention,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-interface */
// noinspection JSUnusedGlobalSymbols

import type { CtxBase } from '@lomray/after';
import type { Manager } from '@lomray/react-mobx-manager';
import '@lomray/afterjs-helpers/typings/after';

declare module '@lomray/after' {
  export interface AfterpartyProps {
    storeManager: Manager;
  }

  export interface DocumentgetInitialProps {
    storeManager: Manager;
  }

  export interface AfterRenderAppOptions<T> {
    storeManager: Manager;
  }

  // @ts-ignore
  export interface Ctx extends CtxBase {
    storeManager: Manager;
  }
}
