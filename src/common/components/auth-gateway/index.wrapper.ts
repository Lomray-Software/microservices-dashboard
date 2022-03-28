import withStore from '@wrappers/with-store';
import stores from './index.stores';
import AuthGateway from './index';

export default withStore(AuthGateway, stores);
