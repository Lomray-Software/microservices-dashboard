import type { IRelation } from '@store/endpoints/interfaces/common/query';

/**
 * User profile
 */
interface IProfile extends IRelation {
  userId: string;
  gender: string;
  photo: string;
  birthDay: string;
  params: {
    isEmailValid?: boolean;
    isPhoneVerified?: boolean;
  };
  updatedAt: string;
}

export default IProfile;
