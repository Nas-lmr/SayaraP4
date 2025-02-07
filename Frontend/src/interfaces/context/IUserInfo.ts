export interface IUserInfo {
  token: string;
  id: string;
  username: string;
  email: string;

  user?: {
    id: number;
    username: string;
  };
}
