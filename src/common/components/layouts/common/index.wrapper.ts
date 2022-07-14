import withStore from '@wrappers/with-store';
import stores from './index.stores';
import Common from './index';

export default withStore(Common, stores);
