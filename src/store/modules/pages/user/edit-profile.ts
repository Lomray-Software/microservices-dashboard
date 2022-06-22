import map from 'lodash.map';
import pick from 'lodash.pick';
import { action, makeObservable } from 'mobx';
import type { IValidationErrors } from '@helpers/handle-state-form';
import { formatValidationError } from '@helpers/handle-state-form';
import shallowDiff from '@helpers/shallow-diff';
import type { ClassReturnType } from '@interfaces/helpers';
import type { IDomain } from '@interfaces/store-type';
import { profileFields as profileValue, userFields as userValue } from '@pages/user/data';
import { Role } from '@store/endpoints/interfaces/authorization/entities/role';
import type { IBaseException } from '@store/endpoints/interfaces/common/microservice';
import type IProfile from '@store/endpoints/interfaces/users/entities/profile';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import type { IConstructorParams } from '@store/manager';
import UserPageStore from './index';

export interface IEditProfile {
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  role: string;
  phone: string | null;
  birthDay: string | null;
  gender: string | null;
}

/**
 * Edit profile store
 */
class EditUserStore implements IDomain {
  /**
   * This is not a singleton
   */
  static isSingleton = false;

  /**
   * API error
   */
  public error: string | null = null;

  /**
   * Current user fields
   */
  public initialValues: IEditProfile;

  /**
   * User store
   * @private
   */
  private userPageStore: ClassReturnType<typeof UserPageStore>;

  /**
   * @constructor
   */
  constructor({ storeManager }: IConstructorParams) {
    this.userPageStore = storeManager.getStore(UserPageStore);

    const { firstName, lastName, middleName, phone, profile, username, role } =
      this.userPageStore.user || {};
    const { birthDay, gender } = profile || {};

    this.initialValues = {
      username: username ?? '',
      firstName: firstName ?? '',
      middleName: middleName ?? '',
      lastName: lastName ?? '',
      role: role ?? Role.user,
      phone: phone || null,
      birthDay: birthDay || null,
      gender: gender || null,
    };

    makeObservable(this, {
      setError: action.bound,
    });
  }

  /**
   * Set error message
   */
  public setError(message: string | null): void {
    this.error = message;
  }

  /**
   * Save user fields
   */
  public save = async (values: IEditProfile): Promise<true | IValidationErrors<IEditProfile>> => {
    const fields = shallowDiff(values, this.initialValues);

    const userFields = pick(fields, map(userValue, 'name'));
    const profileFields = pick(fields, map(profileValue, 'name'));
    const userRole = pick(userFields, 'role');

    if (userFields.role) {
      delete userFields.role;
    }

    const [userError, profileError, updateUserRoleError] = await Promise.all([
      this.userPageStore.updateUser(userFields),
      this.userPageStore.updateProfile(profileFields),
      this.userPageStore.updateUserRole(userRole?.role),
    ]);

    // handle errors
    if (userError || profileError || updateUserRoleError) {
      return formatValidationError<IEditProfile, IUser & IProfile>([
        userError as IBaseException,
        profileError as IBaseException,
        updateUserRoleError as IBaseException,
      ]);
    }

    return true;
  };
}

export default EditUserStore;
