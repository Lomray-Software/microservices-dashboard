import { withStores } from '@lomray/react-mobx-manager';
import stores from './index.stores';
import Header from './index';

export default withStores(Header, stores);
