// import { IStripeProduct } from "../../interfaces/services/IStripeProduct";

// export const stripePayment = async ({
//   passengerId,
//   tripId,
//   seatsReserved,
// }: IStripeProduct) => {
//   try {
//     const response = await fetch(`http://localhost:3310/reservation`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ passengerId, tripId, seatsReserved }),
//     });

//     if (!response.ok) {
//       throw new Error(
//         `Erreur HTTP : ${response.status} ${response.statusText}`
//       );
//     }
//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error("Erreur lors de la recherche:", error);
//     throw new Error(`Erreur lors de la recherche: ${(error as Error).message}`);
//   }
// };
