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
  public isFetching = false;

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
      isFetching: observable,
      shouldRefresh: observable,
      signIn: action.bound,
      signOut: action.bound,
      setError: action.bound,
      setShouldRefresh: action.bound,
      setIsFetching: action.bound,
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
  public setIsFetching(isLoading: boolean): void {
    this.isFetching = isLoading;
  }

  /**
   * Authenticate user
   */
  public signIn = async (login: string, password: string): Promise<void> => {
    this.setError(null);
    this.setIsFetching(true);
    const { result, error } = await this.api.users.user.signIn(
      { login, password },
      {
        headers: {
          'user-info': JSON.stringify({
            device: 'web',
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
      this.setIsFetching(false);

      return;
    }

    const { user, tokens } = result || {};

    if (tokens?.refresh) {
      this.api.apiClient.setRefreshToken(tokens.refresh);
    }

    this.userStore.setUser(user);
    this.userStore.setIsAuth(true);
    this.setIsFetching(false);
  };

  /**
   * Logout user
   */
  public async signOut(): Promise<void> {
    if (!this.userStore.user?.id) {
      return;
    }

    this.setIsFetching(true);

    const { result } = await this.api.users.user.signOut({ userId: this.userStore.user?.id });

    // something went wrong
    if (!result?.loggedOut) {
      await this.api.authentication.cookies.remove();
    }

    this.api.apiClient.setRefreshToken(null);
    this.userStore.setUser(null);
    this.userStore.setIsAuth(false);
    this.setIsFetching(false);
  }

  /**
   * Update auth tokens & refresh user
   */
  public async updateAuthToken(): Promise<void> {
    this.setIsFetching(true);

    if (await this.api.apiClient.renewAuthTokens()) {
      await this.userStore.refresh();
    }

    this.setIsFetching(false);
  }
}

export default Auth;
