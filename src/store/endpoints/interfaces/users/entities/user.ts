import type { IEntity } from '@lomray/microservices-types';
import type { Role } from '@store/endpoints/interfaces/authorization/entities/role';
import type IProfile from './profile';

/**
 * User entity
 */
interface IUser extends IEntity {
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
  role?: Role;
}

export default IUser;
