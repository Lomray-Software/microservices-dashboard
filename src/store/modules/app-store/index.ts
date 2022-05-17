import { action, makeObservable, observable } from 'mobx';
import type { IDomain } from '@interfaces/store-type';

/**
 * App store
 */
class AppStore implements IDomain {
  /**
   * State menu navigation's
   */
  public isNavigation = false;

  /**
   * @constructor
   */
  constructor() {
    makeObservable(this, {
      isNavigation: observable,
      toggleMenuNavigation: action.bound,
    });
  }

  /**
   * Toggle for visible nav menu
   */
  public toggleMenuNavigation(): void {
    this.isNavigation = !this.isNavigation;
  }
}

export default AppStore;
