import { action, makeObservable, observable } from 'mobx';
import type { IValidationErrors } from '@helpers/handle-validation-errors';
import { formatValidationError } from '@helpers/handle-validation-errors';
import type { ClassReturnType } from '@interfaces/helpers';
import type { IUi } from '@interfaces/store-type';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import type { IConstructorParams } from '@store/manager';
import UserPageStore from '@store/modules/pages/user/index';

export interface IChangePasswordState {
  oldPassword: string;
  newPassword: string;
  reEnterNewPassword?: string;
  userId?: IUser['id'];
}

/**
 * Change password store
 */
class ChangePasswordStore implements IUi {
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
  public initialValues: IChangePasswordState;

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

    this.initialValues = {
      oldPassword: '',
      newPassword: '',
      reEnterNewPassword: '',
    };

    makeObservable(this, {
      initialValues: observable,
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
   * Save password fields
   */
  public async save(
    values: IChangePasswordState,
  ): Promise<true | IValidationErrors<IChangePasswordState>> {
    const { oldPassword, newPassword } = values;

    const [changePasswordError] = await Promise.all([
      this.userStore.updatePassword({ oldPassword, newPassword }),
    ]);

    // handle errors
    if (changePasswordError) {
      return formatValidationError<IChangePasswordState, Record<any, any>>(changePasswordError, {
        oldPassword: 'oldPassword',
        newPassword: 'newPassword',
        reEnterNewPassword: 'reEnterNewPassword',
      });
    }

    return true;
  }
}

export default ChangePasswordStore;
