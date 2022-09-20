import type { StoresType } from '@lomray/react-mobx-manager';
import EditUserStore from '@store/modules/pages/user/edit-profile';

const stores = {
  userEdit: EditUserStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
