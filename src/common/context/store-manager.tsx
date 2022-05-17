import type { FC } from 'react';
import React, { useContext } from 'react';
import type Manager from '@store/manager';

/**
 * Mobx store manager context
 */
const StoreManagerContext = React.createContext<Manager>({} as Manager);

/**
 * Mobx store manager provider
 * @constructor
 */
const StoreManagerProvider: FC<{ storeManager: Manager }> = ({ children, storeManager }) => (
  <StoreManagerContext.Provider value={storeManager} children={children} />
);

const useStoreManagerContext = (): Manager => useContext(StoreManagerContext);

export { StoreManagerProvider, useStoreManagerContext };
