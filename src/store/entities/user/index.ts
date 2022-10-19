import Formats from '@lomray/microservices-client-api/constants/formats';
import UserRepository from '@lomray/microservices-client-api/repositories/user';
import DefaultUserImg from '@assets/images/default/default-user.jpg';
import type IUser from '@store/endpoints/interfaces/users/entities/user';

/**
 * User entity
 */
class User extends UserRepository {
  /**
   * Get user avatar or default image
   */
  static getAvatar(user: IUser | null, format: Formats = Formats.medium): string {
    return UserRepository.getAvatarUrl(user, format) || (DefaultUserImg as string);
  }
}

export default User;
