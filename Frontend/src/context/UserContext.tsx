import { jwtDecode } from "jwt-decode";
import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { IDecodedToken } from "../interfaces/context/IDecodedToken";
import { IUserContext } from "../interfaces/context/IUserContext";
import { IUserInfo } from "../interfaces/context/IUserInfo";

// Création du contexte utilisateur
const userContext = createContext<IUserContext | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
  // État pour stocker les données utilisateur et le token décodé
  const [decodedToken, setDecodedToken] = useState<IDecodedToken | null>(null);
  const [userData, setUserData] = useLocalStorage<IUserInfo | null>(
    "user",
    null
  );

  // Restaurer le token à partir des données utilisateur lors du rechargement
  useEffect(() => {
    if (userData && userData.token) {
      const decoded = jwtDecode<IDecodedToken>(userData.token);
      setDecodedToken(decoded);
    } else {
      setDecodedToken(null);
    }
  }, [userData]);

  // Fonction de login pour définir les données utilisateur
  const login = (userInfo: IUserInfo) => {
    setUserData(userInfo); // Stocke les données utilisateur
    const decoded = jwtDecode<IDecodedToken>(userInfo.token); // Décode le token JWT
    setDecodedToken(decoded); // Met à jour le token décodé dans l'état
  };

  // Fonction de logout pour effacer les données utilisateur
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
        localStorage.clear(); // Vide le localStorage
        setUserData(null); // Supprime les données utilisateur
        setDecodedToken(null); // Réinitialise le token décodé
      } else {
        console.error("Failed to logout. Please try again.");
      }
    } catch (err) {
      console.error("An error occurred during logout:", err);
    }
  };

  // Utilise useMemo pour mémoriser les valeurs du contexte
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
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
