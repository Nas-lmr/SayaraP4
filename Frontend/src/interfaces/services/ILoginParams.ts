import { IUserInfo } from "../context/IUserInfo";

export interface ILoginParams {
  email: string;
  password: string;
}

// Typage pour le succès de la réponse
export interface ILoginSuccessResponse {
  success: true;
  error?: true;
  user: IUserInfo;
}

// Typage pour l'échec de la réponse
export interface ILoginErrorResponse {
  success: false;
  error: string;
}

export interface IUserId {
  id: number;
}
