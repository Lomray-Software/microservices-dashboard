import { action, makeObservable, observable } from 'mobx';
import type { IValidationErrors } from '@helpers/handle-validation-errors';
import { formatValidationError } from '@helpers/handle-validation-errors';
import type { ClassReturnType } from '@interfaces/helpers';
import type { IDomain } from '@interfaces/store-type';
import type { IBaseException } from '@store/endpoints/interfaces/common/microservice';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import type { IConstructorParams } from '@store/manager';
import UserPageStore from './index';

export interface IChangePassword {
  newPassword: string;
  reEnterNewPassword?: string;
  userId?: IUser['id'];
}

/**
 * Change password store
 */
class ChangePasswordStore implements IDomain {
  /**
   * This is not a singleton
   */
  static isSingleton = false;

  /**
   * API error
   */
  public error: string | null = null;

  /**
   * Password fields
   */
  public initialValues: IChangePassword;

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

    this.initialValues = {
      newPassword: '',
      reEnterNewPassword: '',
    };

    makeObservable(this, {
      initialValues: observable,
      save: action.bound,
      updatePassword: action.bound,
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
   *
   * Update password
   */
  public async updatePassword(fields: IChangePassword): Promise<IBaseException | undefined> {
    const { error } = await this.api.users.user.changePassword(
      {
        ...fields,
        userId: this.userPageStore.user?.id,
      },
      { shouldShowErrors: false },
    );

    return error;
  }

  /**
   * Save password fields
   */
  public async save(values: IChangePassword): Promise<true | IValidationErrors<IChangePassword>> {
    const { newPassword } = values;

    const changePasswordError = await this.updatePassword({ newPassword });

    // handle errors
    if (changePasswordError) {
      return formatValidationError<IChangePassword, IChangePassword>(changePasswordError);
    }

    return true;
  }
}

export default ChangePasswordStore;
