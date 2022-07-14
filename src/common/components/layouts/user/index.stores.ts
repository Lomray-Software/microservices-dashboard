import type { StoresType } from '@interfaces/helpers';
import UserStore from '@store/modules/user';

const stores = {
  userStore: UserStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
