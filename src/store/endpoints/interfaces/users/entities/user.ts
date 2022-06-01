import type IProfile from './profile';

/**
 * User entity
 */

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  username: string;
  profile: IProfile;
}

export default IUser;
