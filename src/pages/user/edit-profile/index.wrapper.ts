import React from 'react';
import withStore from '@wrappers/with-store';
import stores from './index.stores';
import EditProfile from './index';

export default React.memo(withStore(EditProfile, stores));
