import type { StoresType } from '@lomray/react-mobx-manager';
import UserStore from '@store/modules/user';
import AuthStore from '@store/modules/user/auth';

const stores = {
  authStore: AuthStore,
  userStore: UserStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
