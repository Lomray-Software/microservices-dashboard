/* eslint-disable import/prefer-default-export,@typescript-eslint/naming-convention,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-interface */
import { CtxBase } from '@jaredpalmer/after';
import { IAppContext } from '@context/app';

declare module '@jaredpalmer/after' {
  export interface InitialData {
    context?: {
      app: Partial<Omit<IAppContext, 'setState' | 'cookies'>>;
    };
  }

  export interface AfterpartyProps {
    // store: Store;
  }

  export interface DocumentgetInitialProps {
    // store: Store;
  }

  export interface AfterRenderAppOptions<T> {
    // store: Store;
  }

  export interface Ctx<P> extends CtxBase {
    // store: Store;
  }

  export interface RenderPageResult {
    initialI18nStore: any;
    initialLanguage: string;
    serverContext: Partial<IAppContext>;
    isOnlyShell?: boolean;
  }
}
