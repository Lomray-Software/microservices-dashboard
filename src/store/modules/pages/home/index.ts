import { action, makeObservable, observable } from 'mobx';
import serializedStore from '@common/helpers/serialized-store';
import { IDomain } from '@interfaces/store-type';

/**
 * Home page store
 */
class HomePageStore implements IDomain {
  public title = 'Home';

  constructor() {
    makeObservable(this, {
      title: observable,
      setTitle: action,
    });
  }

  setTitle(title: string): void {
    this.title = title;
  }
}

export default serializedStore(HomePageStore, 'page.home');
