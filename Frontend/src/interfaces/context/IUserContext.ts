import { IUserInfo } from "./IUserInfo";

export interface IUserContext {
  userData: IUserInfo | null;
  setUserData: (userInfo: IUserInfo | null) => void;
  login: (userInfo: IUserInfo) => void;
  logout: () => Promise<void>;
}
