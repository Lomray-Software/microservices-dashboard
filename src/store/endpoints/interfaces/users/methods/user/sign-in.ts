import type IUser from '@store/endpoints/interfaces/users/entities/user';

interface ISignInInput {
  login: string;
  password: string;
}

interface ISignInOutput {
  user: IUser;
  tokens: {
    access?: string;
    refresh: string;
  };
}

export { ISignInInput, ISignInOutput };
