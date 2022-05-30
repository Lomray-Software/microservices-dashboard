import withStore from '@wrappers/with-store';
import stores from './index.stores';
import EditProfile from './index';

export default withStore(EditProfile, stores);
