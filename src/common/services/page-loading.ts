import type { MutableRefObject } from 'react';
import type { LoadingBarRef } from 'react-top-loading-bar';

/**
 * Page loading
 */
class PageLoading {
  /**
   * @type {PageLoading}
   */
  protected static instance: PageLoading;

  protected constructor() {
    // close constructor
  }

  loadingBarRef: MutableRefObject<LoadingBarRef | null>;

  loadingState = false;

  /**
   * Create/get singleton instance
   */
  public static getInstance(): PageLoading {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  /**
   * Set loading bar reference
   */
  setLoadingBarRef(ref: MutableRefObject<LoadingBarRef | null>): void {
    this.loadingBarRef = ref;
  }

  /**
   * Set loading state
   */
  setLoadingState(state: boolean): void {
    if (!this.loadingBarRef?.current) {
      return;
    }

    const isPrevState = this.loadingState;

    this.loadingState = state;

    if (isPrevState === state) {
      return;
    }

    if (state) {
      // @ts-ignore
      this.loadingBarRef.current.continuousStart();
    } else {
      this.loadingBarRef.current.complete();
    }
  }
}

export default PageLoading.getInstance();
