import shallowDiff from '@lomray/client-helpers/helpers/shallow-diff';
import Role from '@lomray/microservices-client-api/constants/role';
import type { IValidationErrors } from '@lomray/microservices-client-api/endpoints';
import type { IBaseException } from '@lomray/microservices-types';
import type { IConstructorParams, ClassReturnType } from '@lomray/react-mobx-manager';
import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { profileFields as profileValue, userFields as userValue } from '@pages/user/data';
import type IProfile from '@store/endpoints/interfaces/users/entities/profile';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
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
  location: string | null;
}

/**
 * Edit profile store
 */
class EditUserStore {
  /**
   * API error
   */
  public error: string | null = null;

  /**
   * Current user fields
   */
  public initialValues: IEditProfile;

  /**
   * @private
   */
  private api: IConstructorParams['endpoints'];

  /**
   * User store
   * @private
   */
  private userPageStore: ClassReturnType<typeof UserPageStore>;

  /**
   * @constructor
   */
  constructor({ getStore, endpoints }: IConstructorParams) {
    this.api = endpoints;
    this.userPageStore = getStore(UserPageStore)!;

    this.setInitValues();

    makeObservable(this, {
      error: observable,
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
    this.setError(null);
    this.setInitValues();

    const fields = shallowDiff(values, this.initialValues);

    const { role } = _.pick(fields, _.map(userValue, 'name')) as { role?: Role };
    const userFields = _.pick(_.omit(fields, ['role']), _.map(userValue, 'name'));
    const profileFields = _.pick(fields, _.map(profileValue, 'name'));

    const [userError, profileError, updateUserRoleError] = await Promise.all([
      this.userPageStore.updateUser(userFields),
      this.userPageStore.updateProfile(profileFields),
      this.userPageStore.updateUserRole(role),
    ]);

    // handle errors
    if (userError || profileError || updateUserRoleError) {
      return this.api.formatValidationError<IEditProfile, IUser & IProfile>([
        userError as IBaseException,
        profileError as IBaseException,
        updateUserRoleError as IBaseException,
      ]);
    }

    return true;
  };

  /**
   * Update init values
   */
  public setInitValues(): void {
    const { firstName, lastName, middleName, phone, profile, username, role } =
      this.userPageStore.user || {};
    const { birthDay, gender, location } = profile || {};

    this.initialValues = {
      ...this.initialValues,
      username: username ?? '',
      firstName: firstName ?? '',
      middleName: middleName ?? '',
      lastName: lastName ?? '',
      role: role ?? Role.user,
      phone: phone || null,
      birthDay: birthDay || null,
      gender: gender || null,
      location: location || null,
    };
  }
}

export default EditUserStore;
