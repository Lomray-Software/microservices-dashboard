import type { StoresType } from '@interfaces/helpers';
import IdentityProviderStore from '@store/modules/pages/user/identity-providers';

const stores = {
  identityProvider: IdentityProviderStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
