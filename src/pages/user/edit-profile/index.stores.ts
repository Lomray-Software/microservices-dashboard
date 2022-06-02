import type { StoresType } from '@interfaces/helpers';
import UserEditStore from '@store/modules/pages/user/edit-profile';

const stores = {
  userEdit: UserEditStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
