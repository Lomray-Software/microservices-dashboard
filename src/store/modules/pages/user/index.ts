import Role from '@lomray/microservices-client-api/constants/role';
import type { IAttachment } from '@lomray/microservices-client-api/interfaces/attachments/entities/attachment';
import type { IBaseException } from '@lomray/microservices-types';
import { JQOrder } from '@lomray/microservices-types';
import type { IConstructorParams } from '@lomray/react-mobx-manager';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import type IProfile from '@store/endpoints/interfaces/users/entities/profile';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import UserEntity from '@store/entities/user';

/**
 * User page store
 */
class UserPageStore {
  /**
   * User
   */
  public user: IUser | null = null;

  /**
   * Indicates than API request in process
   */
  public isFetching = false;

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
      isFetching: observable,
      setUser: action.bound,
      getUser: action.bound,
      setProfile: action.bound,
      getUserRole: action.bound,
      updateUserRole: action.bound,
      setAvatar: action.bound,
      setFetching: action.bound,
    });
  }

  /**
   * Set is loading
   */
  public setFetching(isLoading: boolean): void {
    this.isFetching = isLoading;
  }

  /**
   * Set users
   */
  public setUser(user: IUser): void {
    this.user = user;
  }

  /**
   * Set user avatar
   */
  public setAvatar(avatar: IAttachment | null): void {
    if (!this.user) {
      return;
    }

    UserEntity.assignAvatar(this.user, avatar);
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
    const [{ result, error }, { result: resultAvatar }] = await this.api.batch((api) => [
      api.users.user.view({
        query: {
          relations: ['profile'],
          where: { id },
        },
      }),
      api.attachments.attachment.list({
        query: {
          relations: ['attachmentEntities'],
          where: {
            'attachmentEntities.entityId': id,
          },
          orderBy: {
            'attachmentEntities.order': JQOrder.ASC,
          },
        },
      }),
    ]);

    if (error || !result?.entity) {
      return;
    }

    const { entity } = result;

    entity.role = await this.getUserRole(id);

    if (resultAvatar?.list) {
      const { list } = resultAvatar;

      UserEntity.assignAvatar(entity, list);
    }

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
    if (_.isEmpty(fields)) {
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
    if (_.isEmpty(fields)) {
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

    const { result, error } = await this.api.authorization.userRole.assign(
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
