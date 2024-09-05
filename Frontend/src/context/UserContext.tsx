import {createContext, useState} from "react";
import {ApiConfig} from "../config/apiConfig";
import {IUser} from "../interfaces/context/IUser";
import {IResponse} from "../interfaces/context/IResponse";
import {verifyUrlNotNull} from "../utils";

export const UserContext = createContext({});

export function UserProvider({children}: any) {
  const [user, setUser] = useState({
    token: '',
    authenticated: false
  });

  const loginAction = async (user: IUser): Promise<any> => {
    if(verifyUrlNotNull(ApiConfig.private.login)) {
      const response: IResponse|any = await fetch(ApiConfig.private.login, { method: 'POST', body: JSON.stringify(user) });
      setUser({token: response.token, authenticated: true});
      localStorage.setItem('user', response.token);
    }
    return !!localStorage.getItem('user');
  };

  const logOut = () => {
    setUser({token: '', authenticated: false});
    localStorage.removeItem('user');
    window.location.href = '';
  };
  return (
    <UserContext.Provider value={{loginAction, logOut, user}}>{children}</UserContext.Provider>
  );
}