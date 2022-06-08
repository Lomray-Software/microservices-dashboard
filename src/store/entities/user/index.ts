import DefaultUserImg from '@assets/images/user/default-user.jpg';
import type IUser from '@store/endpoints/interfaces/users/entities/user';

/**
 * User entity
 */
class User {
  /**
   * Get user avatar or default image
   */
  static getAvatar({ profile: { photo } }: IUser): string | any {
    return (photo && { uri: photo }) || DefaultUserImg;
  }

  /**
   * Get user name
   */
  static getName(user: IUser | null): string {
    return [user?.firstName, user?.lastName].join(' ');
  }
}

export default User;
