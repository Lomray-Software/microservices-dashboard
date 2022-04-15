interface IToken {
  id: string;
  userParams: {
    pushNotificationToken?: string;
  };
}

export default IToken;
