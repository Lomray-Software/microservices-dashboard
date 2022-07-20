import { withStores } from '@lomray/react-mobx-manager';
import stores from './index.stores';
import Common from './index';

export default withStores(Common, stores);
