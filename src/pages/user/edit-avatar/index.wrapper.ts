import { withStores } from '@lomray/react-mobx-manager';
import stores from './index.stores';
import AttachmentAvatar from './index';

export default withStores(AttachmentAvatar, stores);
