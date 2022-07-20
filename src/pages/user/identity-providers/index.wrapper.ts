import { withStores } from '@lomray/react-mobx-manager';
import stores from './index.stores';
import IdentityProviders from './index';

export default withStores(IdentityProviders, stores);
