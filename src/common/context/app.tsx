import React, { useCallback, useContext, useMemo, useState } from 'react';
import Cookies from 'universal-cookie';
import { IS_CLIENT } from '@constants/index';
import canUseWebP from '@helpers/can-use-webp';
import type { FCC } from '@interfaces/fc-with-children';

interface IAppContext {
  setState: (state: Partial<Omit<IAppContext, 'setState'>>) => void;
  cookies: Cookies;
  isWebpSupport: boolean;
  domain: string;
  hasLoadingBar: boolean;
}

const initState = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setState: (_: Parameters<IAppContext['setState']>[0]): void => undefined,
  cookies: new Cookies(),
  isWebpSupport: IS_CLIENT ? canUseWebP() : false,
  domain: IS_CLIENT
    ? `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }`
    : '',
  hasLoadingBar: true,
};

/**
 * Global application context
 */
const AppContext = React.createContext(initState);

interface IAppProvider {
  initValue?: Partial<IAppContext>;
}

/**
 * Global application context provider
 * @constructor
 */
const AppProvider: FCC<IAppProvider> = ({ children, initValue = {} }) => {
  const [state, setState] = useState({ ...initState, ...initValue });

  const updateState = useCallback((newState: Parameters<IAppContext['setState']>[0]) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setState: updateState,
    }),
    [state, updateState],
  );

  return <AppContext.Provider value={value} children={children} />;
};

const useAppContext = (): IAppContext => useContext(AppContext);

export { AppContext, AppProvider, useAppContext, IAppContext, initState };
