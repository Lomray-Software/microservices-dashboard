import type { StoresType } from '@interfaces/helpers';
import EditUserStore from '@store/modules/pages/user/edit-profile';

const stores = {
  userEdit: EditUserStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
