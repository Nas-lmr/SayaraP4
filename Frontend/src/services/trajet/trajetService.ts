import { ApiConfig } from "../../config/apiConfig";
import { IPostTrajet } from "../../interfaces/services/IPostTrajet";

export const postTrajet = async (data: IPostTrajet & { ownerId: string }) => {
  const response = await fetch(ApiConfig.private.postTrajet, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return await response.json(); // Récupère la réponse si nécessaire
  } else {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Erreur lors de la création du trajet"
    );
  }
};
