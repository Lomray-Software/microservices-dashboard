import withStore from '@wrappers/with-store';
import stores from './index.stores';
import Header from './index';

export default withStore(Header, stores);
