import withStore from '@wrappers/with-store';
import stores from './index.stores';
import Login from './index';

export default withStore(Login, stores);
