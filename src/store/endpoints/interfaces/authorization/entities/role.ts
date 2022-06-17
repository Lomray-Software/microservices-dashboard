enum Role {
  guest = 'guest',
  user = 'user',
  admin = 'admin',
}

/**
 * Role
 */
interface IRole {
  alias: Role;
  parentAlias: Role | null;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export { IRole, Role };
