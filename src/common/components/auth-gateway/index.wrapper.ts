import { withStores } from '@lomray/react-mobx-manager';
import stores from './index.stores';
import AuthGateway from './index';

export default withStores(AuthGateway, stores);
