import withStore from '@wrappers/with-store';
import stores from './index.stores';
import ChangePassword from './index';

export default withStore(ChangePassword, stores);
