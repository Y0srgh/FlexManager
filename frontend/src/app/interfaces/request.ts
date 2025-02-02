interface Request {
    id: string;
    parent: {
      id: string;
      user: {
        username: string;
        email: string;
      };
    };
  }