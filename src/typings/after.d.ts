/* eslint-disable import/prefer-default-export,@typescript-eslint/naming-convention,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-interface */
// noinspection JSUnusedGlobalSymbols

import type { CtxBase } from '@lomray/after';
import type { Manager } from '@lomray/react-mobx-manager';

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
  export interface Ctx<P> extends CtxBase {
    storeManager: Manager;
  }

  export interface RenderPageResult {
    initialI18nStore: any;
    initialLanguage: string;
    isOnlyShell?: boolean;
  }
}
