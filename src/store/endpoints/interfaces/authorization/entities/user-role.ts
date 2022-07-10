import type { IEntity } from '@lomray/microservices-types';
import type { Role } from '@store/endpoints/interfaces/authorization/entities/role';

/**
 * User role
 */
interface IUserRole extends IEntity {
  userId: string;
  roleAlias: Role;
  createdAt: string;
  updatedAt: string;
}

export default IUserRole;
