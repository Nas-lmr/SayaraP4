import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { IDecodedToken } from "../interfaces/context/IDecodedToken";
import { IUserContext } from "../interfaces/context/IUserContext";
import { IUserInfo } from "../interfaces/context/IUserInfo";
const userContext = createContext<IUserContext | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
  // Utilisation de useLocalStorage avec le type IUserInfo | null
  const [userData, setUserData] = useLocalStorage<IUserInfo | null>(
    "user",
    null
  );
  const [decodedToken, setDecodedToken] = useState<IDecodedToken | null>(null);

  const login = (userInfo: IUserInfo) => {
    setUserData(userInfo);
    const decoded = jwtDecode<IDecodedToken>(userInfo.token);
    setDecodedToken(decoded);
  };

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        localStorage.clear();
        setUserData(null);
        setDecodedToken(null);
      } else {
        console.error("Failed to logout. Please try again.");
      }
    } catch (err) {
      console.error("An error occurred during logout:", err);
    }
  };

  // Mémorisation de la valeur du contexte
  const contextValue = useMemo(
    () => ({
      userData,
      setUserData,
      login,
      logout,
      decodedToken,
    }),
    [userData, decodedToken]
  );

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
}

// Hook pour accéder au contexte utilisateur
export const useUserContext = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a PlayerContextProvider"
    );
  }
  return context;
};
