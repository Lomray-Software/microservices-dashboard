import Formats from '@lomray/microservices-client-api/constants/formats';
import type { IAttachment } from '@lomray/microservices-client-api/interfaces/attachments/entities/attachment';
import type { IJsonQuery, IQuery } from '@lomray/microservices-types';
import DefaultUserImg from '@assets/images/default/default-user.jpg';
import type Endpoints from '@store/endpoints';
import type IUser from '@store/endpoints/interfaces/users/entities/user';
import Base from '@store/entities/base';

/**
 * User entity
 */
class User {
  /**
   * Get user avatar or default image
   */
  static getAvatar(user: IUser | null, format: Formats = Formats.medium): string {
    const uri =
      user?.avatar?.formats?.[format]?.url ?? Base.getAnyAttachmentFormat(user?.avatar)?.url;

    return uri || user?.profile?.photo || (DefaultUserImg as string);
  }

  /**
   * Get user avatar
   */
  static getName(user?: IUser | null): string {
    const { firstName, lastName } = user || {};

    return [firstName, lastName].join(' ');
  }

  /**
   * Assign avatars to users
   */
  static assignAvatars(users: IUser[], avatars: IAttachment[]): void {
    Base.assignEntitiesAttachments(users, avatars, (user, attachments) => {
      user.avatar = attachments?.[0];
    });
  }

  /**
   * Get a list of avatar for a user
   */
  static assignAvatar = (user: IUser, avatar: IAttachment | IAttachment[]): void => {
    user.avatar = Array.isArray(avatar) ? avatar[avatar.length - 1] : avatar;
  };

  /**
   * Request user
   */
  static requestUser = async (
    api: Endpoints,
    {
      userId,
      imgSize = Formats.medium,
      extraAttr = [],
    }: { userId?: string; imgSize?: Formats; extraAttr?: IJsonQuery<IUser>['attributes'] } = {},
  ): Promise<IUser | undefined> => {
    // Get user and his avatar
    const [{ result, error }, { result: resultAvatar }] = await api.batch((batchApi) => [
      batchApi.users.user.view<IQuery<IUser>>({
        query: {
          attributes: ['id', 'firstName', 'lastName', 'username', 'profile.photo', ...extraAttr],
          relations: ['profile'],
          where: { id: userId },
        },
      }),
      batchApi.attachments.attachment.list({
        query: {
          attributes: ['id', 'formats', 'attachmentEntities.order'],
          relations: ['attachmentEntities'],
          where: {
            // try to get only first image
            and: [
              {
                'attachmentEntities.entityId': userId,
              },
              {
                'attachmentEntities.order': 1,
              },
            ],
          },
        },
        payload: {
          onlyFormats: [Formats.thumbnail, imgSize],
        },
      }),
    ]);

    if (error || !result) {
      return;
    }

    const { entity } = result;

    if (resultAvatar) {
      User.assignAvatar(entity, resultAvatar.list);
    }

    return entity;
  };
}

export default User;
