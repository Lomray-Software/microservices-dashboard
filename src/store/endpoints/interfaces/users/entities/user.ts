import type IUserDefault from '@lomray/microservices-client-api/interfaces/users/entities/user';
import type IProfile from './profile';

/**
 * User entity
 */
interface IUser extends IUserDefault {
  profile?: IProfile;
}

export default IUser;
