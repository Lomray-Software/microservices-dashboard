enum IdProvider {
  FIREBASE = 'firebase',
}

/**
 * Identity providers
 */
interface IIdentityProvider {
  userId: string;
  provider: IdProvider;
  identifier: string;
  type: string;
  params: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export { IIdentityProvider, IdProvider };
