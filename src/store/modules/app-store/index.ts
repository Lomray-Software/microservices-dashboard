import { action, makeObservable, observable } from 'mobx';
import type { IDomain } from '@interfaces/store-type';

/**
 * App store
 */
class AppStore implements IDomain {
  /**
   * State menu navigation's
   */
  public hasSidebar = false;

  /**
   * @constructor
   */
  constructor() {
    makeObservable(this, {
      hasSidebar: observable,
      toggleSidebar: action.bound,
    });
  }

  /**
   * Toggle for visible nav menu
   */
  public toggleSidebar(): void {
    this.hasSidebar = !this.hasSidebar;
  }
}

export default AppStore;
