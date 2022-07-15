import hoistNonReactStatics from 'hoist-non-react-statics';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStoreManagerContext } from '@context/store-manager';
import type { FCC } from '@interfaces/fc-with-children';
import type { IConstructableStore } from '@store/manager';

/**
 * Make component observable and pass stores as props
 */
const withStore = <T extends Record<string, any>, TS extends Record<string, IConstructableStore>>(
  Component: FCC<T>,
  stores: TS,
): FCC<Omit<T, keyof TS>> => {
  const storesMap = Object.entries(stores);

  const Element: FCC<Omit<T, keyof TS>> = ({ children, ...props }) => {
    const storeManager = useStoreManagerContext();

    return React.createElement<Record<string, any>>(
      observer(Component),
      {
        ...storeManager.getMapStores(storesMap),
        ...props,
      },
      [children],
    );
  };

  hoistNonReactStatics(Element, Component);
  Element.displayName = `Mobx(${Component.displayName || Component.name})`;

  return Element;
};

export default withStore;
