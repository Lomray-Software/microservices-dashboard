import type { StoresType } from '@interfaces/helpers';
import HomePageStore from '@store/modules/pages/home';

const stores = {
  page: HomePageStore,
};

export type StoreProps = StoresType<typeof stores>;

export default stores;
