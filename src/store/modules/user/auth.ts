import { withFetching } from '@lomray/client-helpers/helpers/with-fetching';
import type { IAuthStore } from '@lomray/microservices-client-api/api-client';
import type { IConstructorParams, ClassReturnType } from '@lomray/react-mobx-manager';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { ACCESS_USER_ROLES, IS_CLIENT, IS_PROD } from '@constants/index';
import i18n from '@services/localization';
import type Endpoints from '@store/endpoints';
import User from '@store/entities/user';
import UserStore from '@store/modules/user';

/**
 * Auth user store
 */
class Auth implements IAuthStore {
  static isSingleton = true;

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
  private api: Endpoints;

  /**
   * @constructor
   */
  constructor({ getStore, endpoints }: IConstructorParams) {
    this.api = endpoints;
    this.userStore = getStore(UserStore)!;

    this.signIn = withFetching(this.signIn, this);
    this.signOut = withFetching(this.signOut, this);
    this.updateAuthToken = withFetching(this.updateAuthToken, this);

    makeObservable(this, {
      error: observable,
      isFetching: observable,
      shouldRefresh: observable,
      setError: action.bound,
      setShouldRefresh: action.bound,
      setFetching: action.bound,
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
  public setFetching(isLoading: boolean): void {
    this.isFetching = isLoading;
  }

  /**
   * Renew user tokens
   */
  public renewTokens: IAuthStore['renewTokens'] = async (params) => {
    const { result, error } = await this.api.authentication.token.renew(params, {
      shouldShowErrors: false,
    });

    if (error) {
      return;
    }

    return result;
  };

  /**
   * Authenticate user
   */
  public signIn = async (login: string, password: string): Promise<void> => {
    this.setError(null);

    // Get user
    const { result, error } = await this.api.users.user.signIn(
      { login, password },
      {
        shouldShowErrors: false,
        request: {
          headers: {
            'user-info': JSON.stringify({
              device: 'web',
              userAgent: navigator.userAgent,
              hasCookies: navigator.cookieEnabled,
              language: navigator.language,
              userAgentData: navigator?.['userAgentData'],
              // Cookie lifetime
              maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
              // only for development
              ...(!IS_PROD ? { authType: 'directly' } : {}),
            }),
          },
        },
      },
    );

    if (error || !result) {
      this.setError(error?.message ?? i18n.t('userNotFound'));

      return;
    }

    const { user, tokens } = result || {};

    // Get user roles
    const roles = (await this.api.apiClient.getTokenPayload({ newToken: tokens.refresh }))?.roles;

    if (!roles || _.intersection(ACCESS_USER_ROLES, roles).length === 0) {
      this.setError(i18n.t('accessDenied'));

      return;
    }

    // save tokens
    void this.api.apiClient.setAccessToken(tokens.access);
    void this.api.apiClient.setRefreshToken(tokens.refresh);

    const { result: resultAvatar } = await this.api.attachments.attachment.list({
      query: {
        attributes: ['id', 'formats', 'attachmentEntities.order'],
        relations: ['attachmentEntities'],
        where: {
          // try to get only first image
          and: [
            {
              'attachmentEntities.entityId': user.id,
            },
            {
              'attachmentEntities.order': 1,
            },
          ],
        },
      },
    });

    if (resultAvatar) {
      User.assignAvatar(user, resultAvatar.list);
    }

    // Success user auth
    this.userStore.setIsUserRefreshed(true);
    this.userStore.setUser(user);
    this.userStore.setIsAuth(true);
  };

  /**
   * Logout user
   */
  public signOut = async (): Promise<void> => {
    if (!this.userStore.user?.id) {
      return;
    }

    try {
      const { result } = await this.api.users.user.signOut(
        { userId: this.userStore.user?.id },
        {
          shouldShowErrors: false,
        },
      );

      // something went wrong
      if (!result?.loggedOut) {
        await this.api.authentication.cookies.remove(undefined, { shouldShowErrors: false });
      }
    } catch (e) {
      console.info('Error logout:', e);
    }

    void this.api.apiClient.setAccessToken(null);
    void this.api.apiClient.setRefreshToken(null);
    this.userStore.setUser(null);
    this.userStore.setIsAuth(false);
  };

  /**
   * Update auth tokens & refresh user
   */
  public updateAuthToken = async (): Promise<void> => {
    if (await this.api.apiClient.renewAuthTokens()) {
      await this.userStore.refresh();
    }
  };
}

export default Auth;
