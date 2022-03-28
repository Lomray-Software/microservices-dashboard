import withAuth from '@wrappers/with-auth';
import withStore from '@wrappers/with-store';
import stores from './index.stores';
import Login from './index';

export default withAuth(withStore(Login, stores), true);
