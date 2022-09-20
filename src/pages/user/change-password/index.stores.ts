import type { StoresType } from '@lomray/react-mobx-manager';
import ChangePasswordStore from '@store/modules/pages/user/change-password';

const stores = {
  userChangePassword: ChangePasswordStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
