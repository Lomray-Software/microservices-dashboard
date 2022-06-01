import type { StoresType } from '@interfaces/helpers';
import UserPageStore from '@store/modules/pages/user';
import EditProfileStore from '@store/modules/pages/user/efit-profile';

const stores = {
  user: UserPageStore,
  userEditProfile: EditProfileStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
