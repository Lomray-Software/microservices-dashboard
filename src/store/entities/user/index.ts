import DefaultUserImg from '@assets/images/default/default-user.jpg';
import type IUser from '@store/endpoints/interfaces/users/entities/user';

/**
 * User entity
 */
class User {
  /**
   * Get user avatar or default image
   */
  static getAvatar(profile: IUser['profile'] | undefined): string {
    return profile?.photo || (DefaultUserImg as string);
  }

  /**
   * Get username
   */
  static getName(user: IUser | null): string {
    return [user?.firstName, user?.lastName].join(' ');
  }
}

export default User;
