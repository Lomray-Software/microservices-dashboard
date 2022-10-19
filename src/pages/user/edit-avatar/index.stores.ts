import type { StoresType } from '@lomray/react-mobx-manager';
import EditAvatarStore from '@store/modules/pages/user/edit-avatar';

const stores = {
  editAvatar: EditAvatarStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
