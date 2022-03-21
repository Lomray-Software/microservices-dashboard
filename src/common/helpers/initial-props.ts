import type { InitialData, Ctx } from '@jaredpalmer/after';
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

    return handler(storeManager.getMapStores(Object.entries(storesMap)) as StoresType<TP>, ctx);
  };

export default InitialProps;
