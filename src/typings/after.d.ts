/* eslint-disable import/prefer-default-export,@typescript-eslint/naming-convention,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-interface */
import type { CtxBase } from '@lomray/after';
import type { IAppContext } from '@context/app';
import type Manager from '@store/manager';

declare module '@jaredpalmer/after' {
  export interface InitialData {
    context?: {
      app: Partial<Omit<IAppContext, 'setState' | 'cookies'>>;
    };
  }

  export interface AfterpartyProps {
    storeManager: Manager;
  }

  export interface DocumentgetInitialProps {
    storeManager: Manager;
  }

  export interface AfterRenderAppOptions<T> {
    storeManager: Manager;
  }

  export interface Ctx<P> extends CtxBase {
    storeManager: Manager;
  }

  export interface RenderPageResult {
    initialI18nStore: any;
    initialLanguage: string;
    serverContext: Partial<IAppContext>;
    isOnlyShell?: boolean;
  }
}
