import hoistNonReactStatics from 'hoist-non-react-statics';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useStoreManagerContext } from '@context/store-manager';
import { IConstructableStore } from '@store/manager';

/**
 * Make component observable and pass stores as props
 */
const withStore = <T, TS extends Record<string, IConstructableStore>>(
  Component: FC<T>,
  stores: TS,
): FC<Omit<T, keyof TS | 'context'>> => {
  const ObserverComponent = observer(Component);
  const storesMap = Object.entries(stores);

  const Element: FC = ({ children, ...props }) => {
    const storeManager = useStoreManagerContext();

    return React.createElement(
      ObserverComponent,
      {
        ...storeManager.getMapStores(storesMap),
        ...props,
      },
      [children],
    );
  };

  hoistNonReactStatics(Element, ObserverComponent);
  Element.displayName = `${Component.displayName || Component.name}Store`;

  return Element;
};

export default withStore;
