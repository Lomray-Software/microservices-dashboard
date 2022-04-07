import type { StoresType } from '@interfaces/helpers';
import UsersPageStore from '@store/modules/pages/users';

const stores = {
  pageStore: UsersPageStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
