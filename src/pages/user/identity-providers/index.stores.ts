import type { StoresType } from '@lomray/react-mobx-manager';
import IdentityProviderStore from '@store/modules/pages/user/identity-providers';

const stores = {
  identityProvider: IdentityProviderStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
