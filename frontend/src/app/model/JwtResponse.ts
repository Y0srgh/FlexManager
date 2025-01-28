export default class JwtResponse {
    public id: string;
    public token: string;
    public refreshToken: string;
    public roles: string[];

 
  
    public constructor(
      id: string,
      token: string,
      refreshToken: string,
      roles: string[],
  
    ) {
      this.token = token;
      this.refreshToken = refreshToken;
      this.id = id;
      this.roles = roles;
  
    }
  }