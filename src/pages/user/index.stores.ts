import type { StoresType } from '@interfaces/helpers';
import UserPageStore from '@store/modules/pages/user';

const stores = {
  userPage: UserPageStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
