import type { StoresType } from '@lomray/react-mobx-manager';
import AppStore from '@store/modules/app-store';

const stores = {
  appStore: AppStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
