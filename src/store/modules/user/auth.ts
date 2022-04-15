import { action, makeObservable, observable } from 'mobx';
import { IS_CLIENT } from '@constants/index';
import type { ClassReturnType } from '@interfaces/helpers';
import type { IDomain } from '@interfaces/store-type';
import i18n from '@services/localization';
import { IConstructorParams } from '@store/manager';
import UserStore from '@store/modules/user';

/**
 * Auth user store
 */
class Auth implements IDomain {
  /**
   * API error message
   */
  public error: string | null = null;

  /**
   * If auth store has some pending request
   * NOTE: except signIn, because Formik control this
   */
  public isLoading = false;

  /**
   * Only for SSR
   * Need update auth tokens and refresh user
   */
  public shouldRefresh = false;

  /**
   * @private
   */
  private userStore: ClassReturnType<typeof UserStore>;

  /**
   * @private
   */
  private api: IConstructorParams['endpoints'];

  /**
   * @constructor
   */
  constructor({ storeManager, endpoints }: IConstructorParams) {
    this.api = endpoints;
    this.userStore = storeManager.getStore(UserStore);

    makeObservable(this, {
      error: observable,
      isLoading: observable,
      shouldRefresh: observable,
      signIn: action.bound,
      signOut: action.bound,
      setError: action.bound,
      setShouldRefresh: action.bound,
      setIsLoading: action.bound,
    });
  }

  /**
   * Call from store manager
   */
  public init(): void {
    // Need update auth tokens & refresh user. This is works only with SSR mode
    if (IS_CLIENT && this.shouldRefresh) {
      this.setShouldRefresh(false);
      void this.updateAuthToken();
    }
  }

  /**
   * Set should refresh
   */
  public setShouldRefresh(shouldRefresh: boolean): void {
    this.shouldRefresh = shouldRefresh;
  }

  /**
   * Set error message
   */
  public setError(message: string | null): void {
    this.error = message;
  }

  /**
   * Set is loading
   */
  public setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  /**
   * Authenticate user
   */
  public async signIn(login: string, password: string): Promise<void> {
    this.setError(null);
    const { result, error } = await this.api.users.user.signIn(
      { login, password },
      {
        headers: {
          'user-info': JSON.stringify({
            userAgent: navigator.userAgent,
            hasCookies: navigator.cookieEnabled,
            language: navigator.language,
            userAgentData: navigator?.['userAgentData'],
          }),
        },
      },
    );

    if (error || !result) {
      this.setError(error?.message ?? i18n.t('userNotFound'));

      return;
    }

    const { user, tokens } = result || {};

    if (tokens?.refresh) {
      this.api.apiClient.setRefreshToken(tokens.refresh);
    }

    this.userStore.setUser(user);
    this.userStore.setIsAuth(true);
  }

  /**
   * Logout user
   */
  public async signOut(): Promise<void> {
    if (!this.userStore.user?.id) {
      return;
    }

    this.setIsLoading(true);

    const { result } = await this.api.users.user.signOut({ userId: this.userStore.user?.id });

    // something went wrong
    if (!result?.loggedOut) {
      await this.api.authentication.cookies.remove();
    }

    this.api.apiClient.setRefreshToken(null);
    this.userStore.setUser(null);
    this.userStore.setIsAuth(false);
    this.setIsLoading(false);
  }

  /**
   * Update auth tokens & refresh user
   */
  public async updateAuthToken(): Promise<void> {
    this.setIsLoading(true);

    if (await this.api.apiClient.renewAuthTokens()) {
      await this.userStore.refresh();
    }

    this.setIsLoading(false);
  }
}

export default Auth;
