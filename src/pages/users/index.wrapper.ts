import withStore from '@wrappers/with-store';
import stores from './index.stores';
import Users from './index';

export default withStore(Users, stores);
