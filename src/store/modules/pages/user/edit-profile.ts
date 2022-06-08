import { action, makeObservable, observable } from 'mobx';
import type { IValidationErrors } from '@helpers/handle-validation-errors';
import { formatValidationError } from '@helpers/handle-validation-errors';
import shallowDiff from '@helpers/shallow-diff';
import type { ClassReturnType } from '@interfaces/helpers';
import type { IDomain } from '@interfaces/store-type';
import type { IBaseException } from '@store/endpoints/interfaces/common/microservice';
import type IProfile from '@store/endpoints/interfaces/users/entities/profile';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import type { IConstructorParams } from '@store/manager';
import UserPageStore from './index';

export interface IEditProfile {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string | null;
  birthDay: string;
  username: string;
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
   * API success
   */
  public isSuccess = false;

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
   * @private
   */
  private api: IConstructorParams['endpoints'];

  /**
   * @constructor
   */
  constructor({ storeManager, endpoints }: IConstructorParams) {
    this.api = endpoints;
    this.userPageStore = storeManager.getStore(UserPageStore);

    const { firstName, lastName, middleName, phone, profile, username } =
      this.userPageStore.user || {};
    const { birthDay } = profile || {};

    this.initialValues = {
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      middleName: middleName ?? '',
      phone: phone || null,
      birthDay: birthDay ?? '',
      username: username ?? '',
    };

    makeObservable(this, {
      initialValues: observable,
      isSuccess: observable,
      save: action.bound,
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
   * Set success send
   */
  public setSuccess(isSuccess: boolean): void {
    this.isSuccess = isSuccess;
  }

  /**
   * Save user fields
   */
  public async save(values: IEditProfile): Promise<true | IValidationErrors<IEditProfile>> {
    const { birthDay, ...userFields } = shallowDiff(values, this.initialValues);

    const [userError, profileError] = await Promise.all([
      this.userPageStore.updateUser(userFields),
      this.userPageStore.updateProfile({ birthDay }),
    ]);

    // handle errors
    if (userError || profileError) {
      return formatValidationError<IEditProfile, IUser & IProfile>([
        userError as IBaseException,
        profileError as IBaseException,
      ]);
    }

    this.setSuccess(true);

    return true;
  }
}

export default EditUserStore;
