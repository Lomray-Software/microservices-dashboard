import withStore from '@wrappers/with-store';
import stores from './index.stores';
import IdentityProviders from './index';

export default withStore(IdentityProviders, stores);
