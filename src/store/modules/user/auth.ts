import { action, makeObservable, observable } from 'mobx';
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
   * @private
   */
  private storeManager: IConstructorParams['storeManager'];

  /**
   * @private
   */
  private api: IConstructorParams['endpoints'];

  /**
   * @constructor
   */
  constructor({ storeManager, endpoints }: IConstructorParams) {
    this.storeManager = storeManager;
    this.api = endpoints;

    makeObservable(this, {
      error: observable,
      signIn: action.bound,
      logout: action.bound,
    });
  }

  /**
   * Authenticate user
   */
  async signIn(login: string, password: string): Promise<void> {
    this.error = null;
    const { result, error } = await this.api.users.signIn({ login, password });

    if (error) {
      this.error = error.message;

      return;
    }

    const { user, tokens } = result || {};

    if (!user) {
      this.error = i18n.t('userNotFound');

      return;
    }

    const userStore = this.storeManager.getStore(UserStore);

    if (tokens?.refresh) {
      this.api.apiClient.setRefreshToken(tokens.refresh);
    }

    userStore.setUser(user);
    userStore.setIsAuth(true);
  }

  /**
   * Logout user
   */
  public async logout(): Promise<void> {
    const userStore = this.storeManager.getStore(UserStore);

    if (!userStore.user?.id) {
      return;
    }

    await this.api.users.signOut({ userId: userStore.user?.id });

    this.api.apiClient.setRefreshToken(null);
    userStore.setUser(null);
    userStore.setIsAuth(false);
  }
}

export default Auth;
