import type { StoresType } from '@interfaces/helpers';
import AuthStore from '@store/modules/user/auth';

const stores = {
  authStore: AuthStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
