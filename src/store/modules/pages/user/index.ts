import isEmpty from 'lodash.isempty';
import { action, makeObservable, observable } from 'mobx';
import type { IDomain } from '@interfaces/store-type';
import type { IBaseException } from '@store/endpoints/interfaces/common/microservice';
import type IProfile from '@store/endpoints/interfaces/users/entities/profile';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import type { IConstructorParams } from '@store/manager';

/**
 * User page store
 */
class UserPageStore implements IDomain {
  /**
   * User
   */
  public user: IUser | null = null;

  /**
   * User role
   */
  public role = '';

  /**
   * @private
   */
  private api: IConstructorParams['endpoints'];

  /**
   * @constructor
   */
  constructor({ endpoints }: IConstructorParams) {
    this.api = endpoints;

    makeObservable(this, {
      user: observable,
      role: observable,
      setUser: action.bound,
      getUser: action.bound,
      setProfile: action.bound,
      setRole: action.bound,
      getUserRole: action.bound,
    });
  }

  /**
   * Set users
   */
  public setUser(user: IUser): void {
    this.user = user;
  }

  /**
   * Set user role
   */
  public setRole(role: string): void {
    if (!role) {
      return;
    }

    this.role = role;
  }

  /**
   * Get users list
   */
  public async getUser(id: string): Promise<void> {
    const { result, error } = await this.api.users.user.view({
      query: {
        relations: ['profile'],
        where: { id },
      },
    });

    if (error || !result?.entity) {
      return;
    }

    this.setUser(result.entity);
  }

  /**
   * Get user role
   */
  public async getUserRole(id: string): Promise<void> {
    const { result, error } = await this.api.authorization.userRole.view({
      userId: id,
    });

    if (error || !result?.roles) {
      return;
    }

    this.setRole(result.roles[0]);
  }

  /**
   * Set/update profile
   */
  public setProfile(profile: IUser['profile']): void {
    if (!this.user) {
      return;
    }

    this.user.profile = profile;
  }

  /**
   * Update user
   */
  public async updateUser(fields: Partial<IUser>): Promise<IBaseException | undefined> {
    if (isEmpty(fields)) {
      return;
    }

    const { result, error } = await this.api.users.user.update(
      {
        fields,
        query: {
          where: { id: this.user?.id },
        },
      },
      { shouldShowErrors: false },
    );

    if (result?.entity) {
      this.setUser({
        ...result.entity,
        profile: result.entity?.profile ?? this.user?.profile,
      });
    }

    return error;
  }

  /**
   * Update user profile
   */
  public async updateProfile(fields: Partial<IProfile>): Promise<IBaseException | undefined> {
    if (isEmpty(fields)) {
      return;
    }

    if (fields.params) {
      fields.params = { ...this.user?.profile?.params, ...fields.params };
    }

    const { result, error } = await this.api.users.profile.update(
      {
        fields,
        query: {
          where: { userId: this.user?.id },
        },
      },
      { shouldShowErrors: false },
    );

    if (result?.entity) {
      this.setProfile(result.entity);
    }

    return error;
  }

  /**
   * Remove user role
   */
  public async removeUserRole(role?: string): Promise<IBaseException | undefined> {
    if (!role) {
      return;
    }

    const { error } = await this.api.authorization.userRole.remove(
      {
        query: {
          where: { userId: this.user?.id },
        },
      },
      { shouldShowErrors: false },
    );

    return error;
  }

  /**
   * Create user role
   */
  public async createUserRole(role?: string): Promise<IBaseException | undefined> {
    if (!role) {
      return;
    }

    const { result, error } = await this.api.authorization.userRole.create(
      {
        fields: { roleAlias: role, userId: this.user?.id },
      },
      { shouldShowErrors: false },
    );

    if (result?.entity) {
      this.setRole(result.entity.roleAlias);
    }

    return error;
  }
}

export default UserPageStore;
