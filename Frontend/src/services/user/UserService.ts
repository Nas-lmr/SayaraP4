import { ApiConfig } from "../../config/apiConfig";
import {
  ILoginErrorResponse,
  ILoginParams,
  ILoginSuccessResponse,
} from "../../interfaces/services/ILoginParams";
import { IRegisterParams } from "../../interfaces/services/IRegisterParams";

export const registerService = async ({
  username,
  email,
  password,
}: IRegisterParams) => {
  try {
    const response = await fetch(ApiConfig.private.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ username, email, password }),
    });

    const responseData = await response.json();

    if (response.status === 201) {
      return { success: true };
    } else {
      const error =
        responseData.message ||
        "Une erreur est survenue lors de l'inscription.";
      return { success: false, error };
    }
  } catch (err) {
    console.error("Network error:", err);
    return {
      success: false,
      error: "Erreur de connexion au serveur. Veuillez réessayer plus tard.",
    };
  }
};

type LoginResponse = ILoginSuccessResponse | ILoginErrorResponse;
export const loginService = async ({
  email,
  password,
}: ILoginParams): Promise<LoginResponse> => {
  try {
    const response = await fetch(ApiConfig.private.login, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 201) {
      const userData = await response.json();
      const token = userData.token;

      if (!token) {
        return {
          success: false,
          error: "Aucun jeton d'authentification fourni",
        };
      }

      return { success: true, user: userData };
    } else {
      const error = await response.json();
      return {
        success: false,
        error: error.message || "Email ou mot de passe incorrect",
      };
    }
  } catch (err) {
    console.error("Login service error:", err);
    return {
      success: false,
      error: "Une erreur s'est produite lors de la connexion",
    };
  }
};
