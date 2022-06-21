import type { Role } from '@store/endpoints/interfaces/authorization/entities/role';

/**
 * User role
 */
interface IUserRole {
  userId: string;
  roleAlias: Role;
  createdAt: string;
  updatedAt: string;
}

export default IUserRole;
