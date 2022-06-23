import type { ClassReturnType } from '@interfaces/helpers';
import type { IDomain } from '@interfaces/store-type';
import type { IIdentityProvider } from '@store/endpoints/interfaces/users/entities/identity-provider';
import type { IConstructorParams } from '@store/manager';
import type { IRequestReturn } from '@store/services/table';
import TableStore from '@store/services/table';
import UserPageStore from './index';

/**
 * Identity provider store
 */
class IdentityProviderStore extends TableStore<IIdentityProvider> implements IDomain {
  /**
   * User page store
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
  constructor({ endpoints, storeManager }: IConstructorParams) {
    super();

    this.getIdentityProviders = this.wrapRequest(this.getIdentityProviders);
    this.api = endpoints;
    this.userPageStore = storeManager.getStore(UserPageStore);
  }

  /**
   * Get identity provides list
   */
  public getIdentityProviders = async (page = 1): Promise<IRequestReturn<IIdentityProvider>> => {
    const { pageSize, where, orderBy } = this.tableState;

    const { result, error } = await this.api.users.identityProvider.list({
      query: {
        pageSize,
        page,
        where: {
          ...where,
          userId: this.userPageStore.user?.id,
        },
        orderBy,
      },
    });

    if (error || !result?.list) {
      return error?.message;
    }

    return { ...result, page };
  };

  /**
   * Remove identity provider
   */
  public async removeIdentity(provider: string, identifier: string): Promise<void> {
    const { result, error } = await this.api.users.identityProvider.remove({
      query: {
        where: {
          userId: this.userPageStore.user?.id,
          provider,
          identifier,
        },
      },
    });

    if (error || !result?.entities) {
      return;
    }

    const convertedIdentitiesProvider = this.entities.filter(
      (identity) => identity.provider === provider && identity.identifier === identifier,
    );

    this.setEntities(convertedIdentitiesProvider);
    this.setTotalCount(convertedIdentitiesProvider.length);
  }
}

export default IdentityProviderStore;
