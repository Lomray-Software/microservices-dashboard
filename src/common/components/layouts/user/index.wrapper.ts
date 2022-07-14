import withStore from '@wrappers/with-store';
import stores from './index.stores';
import User from './index';

export default withStore(User, stores);
