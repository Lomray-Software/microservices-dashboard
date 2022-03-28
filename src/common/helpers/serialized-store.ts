import { reaction, toJS } from 'mobx';
import { IS_SERVER, IS_SPA } from '@constants/index';
import type { TStore } from '@interfaces/store-type';

type TWakeup = (
  store: TStore,
  state: {
    initState?: Record<string, any>;
    initServerState?: Record<string, any>;
  },
) => void;

type TSerialized = {
  serializedKey: string;
  toJSON?: () => Record<string, any>;
  wakeup?: TWakeup;
  addOnChangeListener: (store: TStore, key: string) => void;
};

export type TSerializedStore<TSt> = TSt & TSerialized;

const keys = new Map();
const wakeup: TSerialized['wakeup'] = (store, { initState, initServerState }) => {
  if (initServerState) {
    Object.assign(store, initServerState);
  } else if (initState) {
    Object.assign(store, initState);
  }
};
const onChangeListener: TSerialized['addOnChangeListener'] = (store, key) => {
  if (IS_SERVER || !IS_SPA) {
    return;
  }

  reaction(
    () => (store['toJSON']?.() as Record<string, any>) ?? toJS(store),
    (changedStore) => {
      localStorage.setItem(key, JSON.stringify(changedStore));
    },
  );
};

/**
 * Make store serializable
 */
const serializedStore = <TSt extends TStore>(store: TSt, key: string): TSt => {
  if (keys.has(key) && keys.get(key) === store) {
    throw new Error(`Duplicate serializable store key: ${key}`);
  }

  keys.set(key, store);

  store['serializedKey'] = key;

  if (!('wakeup' in store['prototype'])) {
    store['prototype']['wakeup'] = wakeup;
  }

  if (!('addOnChangeListener' in store['prototype'])) {
    store['prototype']['addOnChangeListener'] = onChangeListener;
  }

  return store;
};

export default serializedStore;
