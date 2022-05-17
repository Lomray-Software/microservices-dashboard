import withStore from '@wrappers/with-store';
import stores from './index.stores';
import SideMenu from './index';

export default withStore(SideMenu, stores);
