import { ApiConfig } from "../../config/apiConfig";
// import { useUserContext } from "../../context/UserContext";
import { IPostTrajet } from "../../interfaces/services/IPostTrajet";

export const usePostTrajet = () => {
  // const { userData } = useUserContext();

  const postTrajet = async (data: IPostTrajet) => {
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
      return await response.json(); // Récupère la réponse si nécessaire
    } else {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erreur lors de la création du trajet"
      );
    }
  };
  return postTrajet;
};





// fetch("https://reqbin.com/echo/get/json", {
//   headers: { Authorization: "Bearer {token}" },
// })
//   .then((resp) => resp.json())
//   .then((json) => console.log(JSON.stringify(json)));
