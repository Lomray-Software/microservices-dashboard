import React, { useContext } from 'react';
import type { FCC } from '@interfaces/fc-with-children';
import type Manager from '@store/manager';

interface IStoreManagerProvider {
  storeManager: Manager;
}

/**
 * Mobx store manager context
 */
const StoreManagerContext = React.createContext<Manager>({} as Manager);

/**
 * Mobx store manager provider
 * @constructor
 */
const StoreManagerProvider: FCC<IStoreManagerProvider> = ({ children, storeManager }) => (
  <StoreManagerContext.Provider value={storeManager} children={children} />
);

const useStoreManagerContext = (): Manager => useContext(StoreManagerContext);

export { StoreManagerProvider, StoreManagerContext, useStoreManagerContext };
