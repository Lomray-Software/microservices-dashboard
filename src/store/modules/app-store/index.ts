import ScrollRestorationService from '@lomray/client-helpers/services/scroll-restoration';
import EventManager from '@lomray/event-manager';
import { action, makeObservable, observable } from 'mobx';
import PageLoading from '@services/page-loading';

interface ILoadingChanged {
  isLoading: boolean;
}

/**
 * App store
 */
class AppStore {
  static isSingleton = true;

  /**
   * State menu navigation's
   */
  public hasSidebar = false;

  /**
   * Transition between pages state
   */
  public isLoading = false;

  /**
   * @constructor
   */
  constructor() {
    makeObservable(this, {
      hasSidebar: observable,
      isLoading: observable,
      toggleSidebar: action.bound,
      setIsLoading: action.bound,
    });
  }

  /**
   * Add store subscribers
   */
  public addSubscribers = (): (() => void) =>
    EventManager.subscribe<ILoadingChanged>('after:loading-changed', ({ isLoading }) => {
      this.setIsLoading(isLoading);
      PageLoading.setLoadingState(isLoading);
      ScrollRestorationService.setLoadingState(isLoading);
    });

  /**
   * Toggle for visible nav menu
   */
  public toggleSidebar(): void {
    this.hasSidebar = !this.hasSidebar;
  }

  /**
   * Set transition between pages state
   */
  public setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }
}

export default AppStore;
