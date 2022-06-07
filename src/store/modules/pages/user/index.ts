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
      setUser: action.bound,
      getUser: action.bound,
      getUserName: action.bound,
    });
  }

  /**
   * Set users
   */
  public setUser(user: IUser): void {
    this.user = user;
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
   * Set/update profile
   */
  public setProfile(profile: IUser['profile']): void {
    if (!this.user) {
      return;
    }

    this.user.profile = profile;
  }

  public getUserName(user: IUser | null): string {
    return user?.username ?? `${String(user?.firstName)} ${String(user?.lastName)}`;
  }

  /**
   * Update user
   */
  public async updateUser(fields: Partial<IUser>): Promise<IBaseException | undefined> {
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
}

export default UserPageStore;
