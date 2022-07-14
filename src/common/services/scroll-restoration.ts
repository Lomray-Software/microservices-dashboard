/**
 * Manually scroll restoration
 */
class ScrollRestoration {
  /**
   * @type {ScrollRestoration}
   */
  protected static instance: ScrollRestoration;

  protected constructor() {
    // close constructor
  }

  loadingState = false;

  currentPathname = '/';

  isClickNavigation = false;

  visitedUrl = new Map();

  /**
   * Create/get singleton instance
   */
  public static getInstance(): ScrollRestoration {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  /**
   * Set loading state
   */
  setLoadingState(isLoading: boolean): void {
    const isPrevState = this.loadingState;

    this.loadingState = isLoading;

    if (isPrevState === isLoading) {
      return;
    }

    // Restore scroll after complete loading new page and only if navigated through browser buttons (back/forward)
    if (!isLoading && !this.isClickNavigation) {
      const scrollY = this.visitedUrl.get(this.currentPathname);

      // Restore scroll after render (setTimeout = 0 like useLayoutEffect, wait correct page height)
      setTimeout(() => window.scrollTo(0, scrollY | 0), 0);
    }

    if (!isLoading) {
      this.isClickNavigation = false;
    }
  }

  /**
   * Get page scroll position
   */
  getScrollPage(): number {
    let docScrollTop = 0;

    if (document.documentElement) {
      docScrollTop = document.documentElement.scrollTop;
    }

    return window.pageYOffset || docScrollTop;
  }

  /**
   * Enable manual scroll restoration
   */
  enableManualScroll() {
    history.scrollRestoration = 'manual';
  }

  /**
   * Disable manual scroll restoration
   */
  disableManualScroll() {
    history.scrollRestoration = 'auto';
  }

  /**
   * Add history push/pop listeners
   */
  addListeners(pathname: string): () => void {
    this.enableManualScroll();

    // Update current url
    this.currentPathname = pathname;

    const detectNavigationType = () => (this.isClickNavigation = true);

    document.body.addEventListener('click', detectNavigationType, true);

    return () => {
      this.disableManualScroll();
      document.body.removeEventListener('click', detectNavigationType, true);
    };
  }

  /**
   * Url changed
   */
  handleNavigate(pathname: string): void {
    this.visitedUrl.set(this.currentPathname, this.getScrollPage());

    // Update current url
    this.currentPathname = pathname;
  }
}

export default ScrollRestoration.getInstance();
