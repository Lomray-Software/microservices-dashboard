import type { TStore } from '@interfaces/store-type';

type TWakeup = (
  store: TStore,
  state: {
    initState?: Record<string, any>;
    initServerState?: Record<string, any>;
  },
) => void;

export type TSerializedStore<TSt> = TSt & {
  serializedKey: string;
  toJSON?: () => Record<string, any>;
  wakeup?: TWakeup;
};

const keys = new Map();
const wakeup: TWakeup = (store, { initState, initServerState }) => {
  if (initServerState) {
    Object.assign(store, initServerState);
  } else if (initState) {
    Object.assign(store, initState);
  }
};

/**
 * Make store serializable
 */
const serializedStore = <TSt>(store: TSt, key: string): TSerializedStore<TSt> => {
  if (keys.has(key) && keys.get(key) === store) {
    throw new Error(`Duplicate serializable store key: ${key}`);
  }

  keys.set(key, store);

  store['serializedKey'] = key;

  if (!('wakeup' in store['prototype'])) {
    store['prototype']['wakeup'] = wakeup;
  }

  return store as TSerializedStore<TSt>;
};

export default serializedStore;
