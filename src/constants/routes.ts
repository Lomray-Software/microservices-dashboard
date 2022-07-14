const ROUTE = {
  HOME: {
    URL: '/',
  },
  USERS: {
    URL: '/users',
  },
  USER: {
    URL: '/user/:id',
    PARAMS: { id: '' },
  },
  SIGN_IN: {
    URL: '/sign-in',
  },
  NOT_FOUND: {
    URL: '*',
  },
};

export default ROUTE;
