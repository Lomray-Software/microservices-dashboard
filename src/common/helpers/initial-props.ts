import type { InitialData, Ctx } from '@lomray/after';
import type { TStoreDefinition } from '@lomray/react-mobx-manager';
import type { StoresType } from '@interfaces/helpers';

type InitialPropsReturnParams = { statusCode?: number } & InitialData;
type InitialPropsReturn = Promise<void> | void | InitialPropsReturnParams;

/**
 * Wrapper for getInitialProps method
 * @constructor
 */
const InitialProps =
  <TP, TMatch>(
    handler: (stores: StoresType<TP>, ctx: Ctx<TMatch>) => InitialPropsReturn,
    storesMap: TP,
  ) =>
  (ctx: Ctx<TMatch>): InitialPropsReturn => {
    const { storeManager } = ctx;
    const map = Object.entries(storesMap) as [string, TStoreDefinition][];

    return handler(storeManager.createStores(map) as StoresType<TP>, ctx);
  };

export default InitialProps;
