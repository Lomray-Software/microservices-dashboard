import type { StoresType } from '@lomray/react-mobx-manager';
import AppStore from '@store/modules/app-store';
import UserStore from '@store/modules/user';

const stores = {
  appStore: AppStore,
  userStore: UserStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
