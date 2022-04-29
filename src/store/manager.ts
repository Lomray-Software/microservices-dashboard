import { toJS, isObservableProp } from 'mobx';
import { IS_SPA } from '@constants/index';
import type { TSerializedStore } from '@helpers/serialized-store';
import type { TStore } from '@interfaces/store-type';
import Endpoints from '@store/endpoints';

export interface IConstructorParams {
  storeManager: Manager;
  endpoints: Endpoints;
}

export type IConstructableStore<TSto = TStore> = new (props: IConstructorParams) =>
  | TSerializedStore<TSto>
  | (TSto & { init?: () => void });

interface IManagerParams {
  endpoints: Endpoints;
  initState?: Record<string, any>;
  initServerState?: Record<string, any>;
}

/**
 * Mobx stores manages
 */
class Manager {
  /**
   * Local storage key for stores state
   */
  static readonly localStorageKey = 'store';

  /**
   * Only used stores
   */
  private readonly initiatedStores = new Map<
    IConstructableStore,
    TSerializedStore<TStore> | TStore
  >();

  /**
   * Initial stores state (local storage, custom etc.)
   * @private
   */
  private readonly initState: Record<string, any>;

  /**
   * Initial stores state from server (SSR only)
   * @private
   */
  private readonly initServerState: Record<string, any>;

  /**
   * API endpoints
   * @private
   */
  private readonly endpoints: IManagerParams['endpoints'];

  /**
   * @constructor
   */
  constructor({ endpoints, initState, initServerState }: IManagerParams) {
    this.initState = initState || {};
    this.initServerState = initServerState || {};
    this.endpoints = endpoints;

    this.endpoints.apiClient.setStoreManager(this);
  }

  /**
   * Get initiated store or create new
   */
  public getStore<T>(store: IConstructableStore<T>): T {
    if (this.initiatedStores.has(store)) {
      return this.initiatedStores.get(store) as T;
    }

    const newStore = new store({ storeManager: this, endpoints: this.endpoints });

    // restore state for store
    if ('wakeup' in newStore && 'serializedKey' in store) {
      const key = store['serializedKey'];
      const initServerState = this.initServerState[key];
      const initState = this.initState[key];

      newStore.wakeup?.(newStore, { initState, initServerState });
      newStore.addOnChangeListener?.(newStore, key);
      newStore.init?.();
    } else if (!IS_SPA) {
      // SSR case. Automatically assign store name and restore state from server
      const key = store.name;
      const initState = this.initServerState[key];

      // this need for @see this.toJSON
      store['serializedKey'] = store.name;

      if (initState) {
        Object.assign(newStore, initState);
      }

      newStore.init?.();
    }

    // make store like a singleton
    if (store?.['isSingletone'] ?? true) {
      this.initiatedStores.set(store, newStore);
    }

    return newStore as T;
  }

  /**
   * Init stores map
   */
  public getMapStores(map: [string, IConstructableStore][]): { [storeKey: string]: TStore } {
    return map.reduce(
      (res, [key, store]) => ({
        ...res,
        [key]: this.getStore(store),
      }),
      {},
    );
  }

  /**
   * Get state from used serialized stores (used in SSR)
   * @see StoreData
   */
  public toJSON(): Record<string, any> {
    const result = {};

    for (const [storeClass, instance] of this.initiatedStores.entries()) {
      if ('serializedKey' in storeClass) {
        result[storeClass['serializedKey']] =
          instance['toJSON']?.() ?? Manager.getObservableProps(instance);
      }
    }

    return result;
  }

  /**
   * Get observable store props (fields)
   * @private
   */
  public static getObservableProps(store: TStore): Record<string, any> {
    const props = toJS(store);

    return Object.entries(props).reduce(
      (res, [prop, value]) => ({
        ...res,
        ...(isObservableProp(store, prop) ? { [prop]: value } : {}),
      }),
      {},
    );
  }
}

export default Manager;
