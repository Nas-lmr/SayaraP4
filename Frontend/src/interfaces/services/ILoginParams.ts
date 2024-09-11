import { IUserInfo } from "../context/IUserInfo";

export interface ILoginParams {
  email: string;
  password: string;
}

// Typage pour le succès de la réponse
export interface ILoginSuccessResponse {
  success: true;
  user: IUserInfo; // Vous pouvez remplacer 'any' par le type de votre utilisateur s'il est défini
}

// Typage pour l'échec de la réponse
export interface ILoginErrorResponse {
  success: false;
  error: string;
}
