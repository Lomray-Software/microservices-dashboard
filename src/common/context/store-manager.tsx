import React, { FC, useContext } from 'react';
import Manager from '@store/manager';

/**
 * Mobx store manager context
 */
const StoreManagerContext = React.createContext(new Manager());

/**
 * Mobx store manager provider
 * @constructor
 */
const StoreManagerProvider: FC<{ storeManager: Manager }> = ({ children, storeManager }) => (
  <StoreManagerContext.Provider value={storeManager} children={children} />
);

const useStoreManagerContext = (): Manager => useContext(StoreManagerContext);

export { StoreManagerProvider, useStoreManagerContext };
