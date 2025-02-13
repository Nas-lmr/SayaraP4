import { ApiConfig } from "../../config/apiConfig";
import { IInfoTrajet } from "../../interfaces/services/IInfoTrajet";
import { IPostTrajet } from "../../interfaces/services/IPostTrajet";
import { ISearchTrajet } from "../../interfaces/services/ISearchTrajet";
export const usePostTrajet = () => {
  const postTrajet = async (data: IPostTrajet) => {
    try {
      const response = await fetch(ApiConfig.private.postTrajet, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return await response.json();
      } else {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de la création du trajet"
        );
      }
    } catch (error) {
      console.error(
        "An error occurred while creating the trip:",
        (error as Error).message
      );
      throw error;
    }
  };

  return postTrajet;
};

export const searchTrajet = async (params: ISearchTrajet) => {
  const { departureCity, arrivalCity, travelDate } = params;

  try {
    const response = await fetch(
      // `${ApiConfig.private.searchTrajet}?${queryString.toString()}`,
      `${
        import.meta.env.VITE_BACKEND_URL
      }/trip/filtre?dCity=${departureCity}&aCity=${arrivalCity}&dDate=${travelDate}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erreur HTTP : ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    throw new Error(`Erreur lors de la recherche: ${(error as Error).message}`);
  }
};

export const trajetInfo = async (params: IInfoTrajet) => {
  const { id } = params;
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/trip/one/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erreur HTTP : ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    throw new Error(`Erreur lors de la recherche: ${(error as Error).message}`);
  }
};
