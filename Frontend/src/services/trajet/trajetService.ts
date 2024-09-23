import { ApiConfig } from "../../config/apiConfig";
// import { useUserContext } from "../../context/UserContext";
import { IPostTrajet } from "../../interfaces/services/IPostTrajet";
import { ISearchTrajet } from "../../interfaces/services/ISearchTrajet";
export const usePostTrajet = () => {
  // const { userData } = useUserContext();

  const postTrajet = async (data: IPostTrajet) => {
    try {
      // const token = userData?.token;
      // console.log(token, "TOKEN");

      const response = await fetch(ApiConfig.private.postTrajet, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log(response, "testtest");
        return await response.json(); // Récupère la réponse si nécessaire
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
      // Optionally return an error object or rethrow it
      throw error;
    }
  };

  return postTrajet;
};

// fetch("https://reqbin.com/echo/get/json", {
//   headers: { Authorization: "Bearer {token}" },
// })
//   .then((resp) => resp.json())
//   .then((json) => console.log(JSON.stringify(json)));

export const searchTrajet = async (params: ISearchTrajet) => {
  const { departureCity, arrivalCity, travelDate } = params;

  try {
    // Construction de l'URL avec des paramètres de requête

    const response = await fetch(
      // `${ApiConfig.private.searchTrajet}?${queryString.toString()}`,
      `http://localhost:3310/trip/filtre?dCity=${departureCity}&aCity=${arrivalCity}&dDate=${travelDate}`,
      {
        method: "GET",
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
