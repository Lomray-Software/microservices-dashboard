import type { IConstructorParams } from '@lomray/react-mobx-manager';
import type Endpoints from '@store/endpoints';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import type { IRequestReturn } from '@store/services/table';
import TableStore from '@store/services/table';

/**
 * Users page store
 */
class UsersPageStore extends TableStore<IUser> {
  /**
   * @private
   */
  private api: Endpoints;

  /**
   * @constructor
   */
  constructor({ endpoints }: IConstructorParams) {
    super();

    this.getUsers = this.wrapRequest(this.getUsers);
    this.api = endpoints;
  }

  /**
   * Get users list
   */
  public getUsers = async (page = 1): Promise<IRequestReturn<IUser>> => {
    const { pageSize, where, orderBy } = this.tableState;

    const { result, error } = await this.api.users.user.list({
      query: {
        pageSize,
        page,
        where,
        orderBy,
      },
    });

    if (error || !result) {
      return error?.message;
    }

    return { ...result, page };
  };
}

export default UsersPageStore;
