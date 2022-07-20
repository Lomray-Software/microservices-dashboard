import type { IBaseException } from '@lomray/microservices-types';
import type { IConstructorParams } from '@lomray/react-mobx-manager';
import isEmpty from 'lodash.isempty';
import { action, makeObservable, observable } from 'mobx';
import type Endpoints from '@store/endpoints';
import { Role } from '@store/endpoints/interfaces/authorization/entities/role';
import type IProfile from '@store/endpoints/interfaces/users/entities/profile';
import type IUser from '@store/endpoints/interfaces/users/entities/user';

/**
 * User page store
 */
class UserPageStore {
  /**
   * User
   */
  public user: IUser | null = null;

  /**
   * @private
   */
  private api: Endpoints;

  /**
   * @constructor
   */
  constructor({ endpoints }: IConstructorParams) {
    this.api = endpoints;

    makeObservable(this, {
      user: observable,
      setUser: action.bound,
      getUser: action.bound,
      setProfile: action.bound,
      getUserRole: action.bound,
      updateUserRole: action.bound,
    });
  }

  /**
   * Set users
   */
  public setUser(user: IUser): void {
    this.user = user;
  }

  /**
   * Get user role
   */
  public async getUserRole(id: string): Promise<Role> {
    const { result, error } = await this.api.authorization.userRole.view({
      userId: id,
    });

    if (error || !result?.roles) {
      return Role.user;
    }

    return result?.roles?.[0] ?? Role.user;
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

    const { entity } = result;

    entity.role = await this.getUserRole(id);

    this.setUser(entity);
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
   * Update user role
   */
  public async updateUserRole(role?: Role): Promise<IBaseException | undefined> {
    if (!role) {
      return;
    }

    await this.api.authorization.userRole.remove(
      {
        query: {
          where: { userId: this.user?.id },
        },
      },
      { shouldShowErrors: false },
    );

    const { result, error } = await this.api.authorization.userRole.create(
      {
        fields: { roleAlias: role, userId: this.user?.id },
      },
      { shouldShowErrors: false },
    );

    if (this.user) {
      this.user.role = result?.entity.roleAlias || Role.user;
    }

    return error;
  }
}

export default UserPageStore;
