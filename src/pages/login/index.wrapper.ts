import { withStores } from '@lomray/react-mobx-manager';
import stores from './index.stores';
import Login from './index';

export default withStores(Login, stores);
