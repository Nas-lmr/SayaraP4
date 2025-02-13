import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IUserContext } from "../interfaces/context/IUserContext";
import { IUserInfo } from "../interfaces/context/IUserInfo";

const userContext = createContext<IUserContext | null>(null);
export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<IUserInfo | null>(null);

  const login = async (userInfo: IUserInfo) => {
    setUserData(userInfo);
    await persistLogin();
  };

  console.log(userData, "context ");

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/logout`,

        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setUserData(null);
      } else {
        console.error("Failed to logout. Please try again.");
      }
    } catch (err) {
      console.error("An error occurred during logout:", err);
    }
  };

  // une function pour surveiller si l'utilisateur est connecté
  const persistLogin = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/persist`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("Persisted user data:", data);

        setUserData(data);
      } else {
        console.warn("error the User might be logged out.");
      }
    } catch (err) {
      console.error("Error persisting login:", err);
    }
  };

  useEffect(() => {
    persistLogin();
  }, []);

  const contextValue = useMemo(
    () => ({
      userData,
      setUserData,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userData]
  );

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
