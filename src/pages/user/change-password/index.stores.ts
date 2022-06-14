import type { StoresType } from '@interfaces/helpers';
import ChangePasswordStore from '@store/modules/pages/user/change-password';

const stores = {
  userChangePassword: ChangePasswordStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
