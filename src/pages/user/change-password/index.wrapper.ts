import { withStores } from '@lomray/react-mobx-manager';
import stores from './index.stores';
import ChangePassword from './index';

export default withStores(ChangePassword, stores);
