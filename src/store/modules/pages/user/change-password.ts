import type { IConstructorParams, ClassReturnType } from '@lomray/react-mobx-manager';
import { action, makeObservable, observable } from 'mobx';
import type { IValidationErrors } from '@helpers/handle-state-form';
import { formatValidationError } from '@helpers/handle-state-form';
import i18n from '@services/localization';
import UserPageStore from './index';

export interface IChangePassword {
  newPassword: string;
  reEnterNewPassword?: string;
}

/**
 * Change password store
 */
class ChangePasswordStore {
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
  constructor({ getStore, endpoints }: IConstructorParams) {
    this.api = endpoints;
    this.userPageStore = getStore(UserPageStore)!;

    this.initialValues = {
      newPassword: '',
      reEnterNewPassword: '',
    };

    makeObservable(this, {
      initialValues: observable,
      save: action.bound,
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
   * Save password fields
   */
  public async save(values: IChangePassword): Promise<true | IValidationErrors<IChangePassword>> {
    const { newPassword } = values;
    const userId = this.userPageStore.user?.id;

    if (!userId) {
      return { message: i18n.t('user-page:userNotFound') };
    }

    const { error } = await this.api.users.user.changePassword(
      {
        newPassword,
        userId,
        allowByAdmin: true,
      },
      { shouldShowErrors: false },
    );

    // handle errors
    if (error) {
      return formatValidationError<IChangePassword, IChangePassword>(error);
    }

    return true;
  }
}

export default ChangePasswordStore;
