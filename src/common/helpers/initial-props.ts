import type { InitialData, Ctx } from '@lomray/after';
import type { TStoreDefinition, StoresType } from '@lomray/react-mobx-manager';
import type { SSRComponent } from '@interfaces/ssr-component';

type InitialPropsReturnParams = { statusCode?: number } & InitialData;
type InitialPropsReturn = Promise<void> | void | InitialPropsReturnParams;

/**
 * Wrapper for getInitialProps method
 * @constructor
 */
const InitialProps = <TP, TMatch>(
  handler: (stores: StoresType<TP>, ctx: Ctx<TMatch>) => InitialPropsReturn,
  Component: SSRComponent,
  stores: TP,
) => {
  const contextId = 'ssr';

  Component['contextId'] = contextId;
  Component.getInitialProps = (ctx: Ctx<TMatch>): InitialPropsReturn => {
    const { storeManager } = ctx;
    const map = Object.entries(stores) as [string, TStoreDefinition][];

    return handler(
      storeManager.createStores(
        map,
        'root',
        storeManager.createContextId(contextId),
      ) as StoresType<TP>,
      ctx,
    );
  };
};

export default InitialProps;
