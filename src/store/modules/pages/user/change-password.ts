import { action, makeObservable, observable } from 'mobx';
import type { IValidationErrors } from '@helpers/format-validation-errors';
import formatValidationError from '@helpers/format-validation-errors';
import type { ClassReturnType } from '@interfaces/helpers';
import type { IUi } from '@interfaces/store-type';
import type { IBaseException } from '@store/endpoints/interfaces/common/microservice';
import type IProfile from '@store/endpoints/interfaces/users/entities/profile';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import type { IConstructorParams } from '@store/manager';
import UserPageStore from '@store/modules/pages/user/index';

export interface IEditProfileState {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  birthDay: string;
}

/**
 * Edit profile store
 */
class EditProfileStore implements IUi {
  /**
   * This is not a singleton
   */
  static isSingleton = false;

  /**
   * Current user fields
   */
  public initialValues: IEditProfileState;

  /**
   * User avatar
   */
  public avatar?: string;

  /**
   * User store
   * @private
   */
  private userStore: ClassReturnType<typeof UserPageStore>;

  /**
   * @private
   */
  private api: IConstructorParams['endpoints'];

  /**
   * @constructor
   */
  constructor({ storeManager, endpoints }: IConstructorParams) {
    this.api = endpoints;
    this.userStore = storeManager.getStore(UserPageStore);

    const { firstName, lastName, middleName, phone, profile } = this.userStore.user as IUser;
    const { birthDay } = profile;

    this.initialValues = {
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      middleName: middleName ?? '',
      phone: phone ?? '',
      birthDay: birthDay ?? '',
    };

    makeObservable(this, {
      initialValues: observable,
      avatar: observable,
      save: action.bound,
    });
  }

  /**
   * Save user fields
   */
  public async save(
    values: IEditProfileState,
  ): Promise<true | IValidationErrors<IEditProfileState>> {
    const { firstName, lastName, middleName, phone, birthDay } = values;

    const [userError, profileError] = await Promise.all([
      this.userStore.updateUser({ firstName, lastName, middleName, phone }),
      this.userStore.updateProfile({ birthDay }),
    ]);

    // handle errors
    if (userError || profileError) {
      return formatValidationError<IEditProfileState, IUser & IProfile>(
        [userError as IBaseException, profileError as IBaseException],
        {
          firstName: 'firstName',
          lastName: 'lastName',
        },
      );
    }

    return true;
  }
}

export default EditProfileStore;
