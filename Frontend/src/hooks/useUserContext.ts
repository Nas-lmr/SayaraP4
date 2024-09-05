import {useContext} from "react";
import {UserContext} from "../context/UserContext.tsx";

export const useUserContext = () => useContext(UserContext);