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
}

export default IUser;
