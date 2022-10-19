import { withFetching } from '@lomray/client-helpers/helpers/with-fetching';
import Formats from '@lomray/microservices-client-api/constants/formats';
import type { IAttachment } from '@lomray/microservices-client-api/interfaces/attachments/entities/attachment';
import type { IConstructorParams, ClassReturnType } from '@lomray/react-mobx-manager';
import { action, makeObservable, observable } from 'mobx';
import UserPageStore from './index';

/**
 * Edit user avatar store
 */
class EditAvatarStore {
  /**
   * Indicates than API request in process
   */
  public isFetching = false;

  /**
   * User store
   * @private
   */
  public userPageStore: ClassReturnType<typeof UserPageStore>;

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
    this.updateAvatar = withFetching(this.updateAvatar, this);

    makeObservable(this, {
      isFetching: observable,
      setFetching: action.bound,
    });
  }

  /**
   * Set is loading
   */
  public setFetching(isLoading: boolean): void {
    this.isFetching = isLoading;
  }

  /**
   * Update user avatar
   */
  public updateAvatar = async (attachment?: IAttachment | null): Promise<void | boolean> => {
    const userId = this.userPageStore.user?.id;

    if (!attachment || !userId) {
      return false;
    }

    const { result, error: errorAttachment } = await this.api.attachments.attachment.create({
      type: 'image',
      alt: attachment?.alt,
      file: attachment.formats![Formats.large].url,
      userId,
    });

    if (errorAttachment) {
      return false;
    }

    if (!result?.entity) {
      return false;
    }

    const { entity } = result;

    const { error } = await this.api.attachments.attachmentEntity.create({
      fields: {
        attachmentId: entity?.id,
        entityId: userId,
        type: 'user',
        microservice: 'users',
      },
    });

    if (error) {
      return false;
    }

    await this.removeAvatar();

    this.userPageStore.setAvatar(entity);

    return true;
  };

  /**
   * Remove user avatar
   */
  public removeAvatar = async (): Promise<boolean> => {
    const { id } = this.userPageStore.user?.avatar || {};

    if (!id) {
      return true;
    }

    const { error } = await this.api.attachments.attachment.remove({ id });

    if (error) {
      return false;
    }

    this.userPageStore.setAvatar(null);

    return true;
  };
}

export default EditAvatarStore;
