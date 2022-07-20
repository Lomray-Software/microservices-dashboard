import { withStores } from '@lomray/react-mobx-manager';
import stores from './index.stores';
import SideMenu from './index';

export default withStores(SideMenu, stores);
