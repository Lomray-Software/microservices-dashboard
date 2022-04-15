/**
 * User profile
 */
interface IProfile {
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
