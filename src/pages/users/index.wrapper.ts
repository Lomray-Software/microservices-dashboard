import withAuth from '@wrappers/with-auth';
import withStore from '@wrappers/with-store';
import stores from './index.stores';
import Users from './index';

export default withAuth(withStore(Users, stores));
