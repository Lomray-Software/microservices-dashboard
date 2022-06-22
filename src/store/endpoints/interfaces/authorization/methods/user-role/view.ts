import type { Role } from '@store/endpoints/interfaces/authorization/entities/role';

interface IUserRoleViewInput {
  userId: string;
}

interface IUserRoleViewOutput {
  roles: Role[];
}

export { IUserRoleViewInput, IUserRoleViewOutput };
