import { toJS, isObservableProp } from 'mobx';
import type { TSerializedStore } from '@helpers/serialized-store';
import type { TStore } from '@interfaces/store-type';

interface IConstructorParams {
  storeManager: Manager;
}

export interface IConstructableStore {
  new (props: IConstructorParams): TSerializedStore<TStore>;
}

interface IManagerParams {
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
  private readonly initiatedStores = new Map<IConstructableStore, TSerializedStore<TStore>>();

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
   * @constructor
   */
  constructor({ initState, initServerState }: IManagerParams = {}) {
    this.initState = initState || {};
    this.initServerState = initServerState || {};
  }

  /**
   * Get initiated store or create new
   */
  public getStore(store: IConstructableStore): TStore {
    if (this.initiatedStores.has(store)) {
      return this.initiatedStores.get(store) as TStore;
    }

    const newStore = new store({ storeManager: this });

    // restore state for store
    if ('wakeup' in newStore && 'serializedKey' in store) {
      const key = store['serializedKey'];
      const initServerState = this.initServerState[key];
      const initState = this.initState[key];

      newStore.wakeup?.(newStore, { initState, initServerState });
    }

    this.initiatedStores.set(store, newStore);

    return newStore;
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
   * Get state from used serialized stores
   */
  public toJSON(): Record<string, any> {
    const result = {};

    for (const [storeClass, instance] of this.initiatedStores.entries()) {
      if ('serializedKey' in storeClass) {
        result[storeClass['serializedKey']] =
          instance.toJSON?.() ?? this.getObservableProps(instance);
      }
    }

    return result;
  }

  /**
   * Get observable store props (fields)
   * @private
   */
  private getObservableProps(store: TStore): Record<string, any> {
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
