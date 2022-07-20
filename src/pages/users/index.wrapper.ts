import { withStores } from '@lomray/react-mobx-manager';
import stores from './index.stores';
import Users from './index';

export default withStores(Users, stores);
