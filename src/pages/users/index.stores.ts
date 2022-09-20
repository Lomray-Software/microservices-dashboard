import type { StoresType } from '@lomray/react-mobx-manager';
import UsersPageStore from '@store/modules/pages/users';

const stores = {
  pageStore: UsersPageStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
