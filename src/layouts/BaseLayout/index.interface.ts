export interface User {
  name: string;
  username: string;
  password: string;
  slogan: string;
  gravatar: string;
}

export interface ResponseData {
  getInfo: User;
}
