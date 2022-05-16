import hoistNonReactStatics from 'hoist-non-react-statics';
import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import React from 'react';
import { useStoreManagerContext } from '@context/store-manager';
import type { IConstructableStore } from '@store/manager';

/**
 * Make component observable and pass stores as props
 */
const withStore = <T extends Record<string, any>, TS extends Record<string, IConstructableStore>>(
  Component: FC<T>,
  stores: TS,
): FC<Omit<T, keyof TS>> => {
  const storesMap = Object.entries(stores);

  const Element: FC = ({ children, ...props }) => {
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
  Element.displayName = `${Component.displayName || Component.name}Store`;

  return Element;
};

export default withStore;
