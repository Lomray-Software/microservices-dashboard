import { withStores } from '@lomray/react-mobx-manager';
import React from 'react';
import stores from './index.stores';
import EditProfile from './index';

export default React.memo(withStores(EditProfile, stores));
