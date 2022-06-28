import { reaction, toJS } from 'mobx';
import { IS_PROD, IS_SERVER, IS_SPA } from '@constants/index';
import type { TStore } from '@interfaces/store-type';
import Manager from '@store/manager';

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
  init?: () => void;
  addOnChangeListener: (store: TStore, key: string) => void;
};

export type TSerializedStore<TSt> = TSt & TSerialized;

const storesObj = new Map();

/**
 * Save serialized stores in local storage
 */
const saveStoresState = () => {
  localStorage.setItem(Manager.localStorageKey, JSON.stringify(Object.fromEntries(storesObj)));
};

/**
 * Return stores state from local storage
 */
const getStoresState = (): Record<string, any> => {
  try {
    return JSON.parse(localStorage.getItem(Manager.localStorageKey) || '{}') as Record<string, any>;
  } catch (e) {
    return {};
  }
};

/**
 * Restore store state from initial state
 */
const wakeup: TSerialized['wakeup'] = (store, { initState, initServerState }) => {
  if (initServerState) {
    Object.assign(store, initServerState);
  } else if (initState) {
    Object.assign(store, initState);
  }
};

/**
 * Listen store changes
 */
const onChangeListener: TSerialized['addOnChangeListener'] = (store, key) => {
  if (IS_SERVER || (!IS_SPA && IS_PROD)) {
    return;
  }

  reaction(
    () => (store['toJSON']?.() as Record<string, any>) ?? toJS(store),
    () => {
      storesObj.set(key, Manager.getObservableProps(store));
      saveStoresState();
    },
  );
};

/**
 * Make store serializable
 */
const serializedStore = <TSt extends TStore>(store: TSt, key: string): TSt => {
  if (storesObj.has(key)) {
    throw new Error(`Duplicate serializable store key: ${key}`);
  }

  storesObj.set(key, {});

  store['serializedKey'] = key;

  if (!('wakeup' in store['prototype'])) {
    store['prototype']['wakeup'] = wakeup;
  }

  if (!('addOnChangeListener' in store['prototype'])) {
    store['prototype']['addOnChangeListener'] = onChangeListener;
  }

  return store;
};

export { serializedStore, getStoresState };
