import { Box, Typography } from "@mui/material";
import { PaymentElement, CardElement } from "@stripe/react-stripe-js"; // Ajout de CardElement pour utiliser la carte
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { stripePayment } from "../../services/stripe/StripeService";
import { trajetInfo } from "../../services/trajet/trajetService";
import { IInfoTrajetId } from "../../interfaces/services/IInfoTrajet";

export default function PaymentForm() {
  const { id } = useParams<{ id: string | undefined }>(); // Récupération de l'ID du trajet à partir de l'URL
  const { decodedToken } = useUserContext(); // Récupération du contexte utilisateur
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trajet, setTrajet] = useState<IInfoTrajetId | null>(null); // Pour stocker les infos du trajet

  useEffect(() => {
    const fetchTrajetId = async () => {
      const trajetId = id ?? null;
      try {
        const response = await trajetInfo({ id: trajetId });
        setTrajet(response.data); // Récupère les données du trajet
      } catch (error) {
        console.error("Erreur lors de la récupération du trajet:", error);
      }
    };
    fetchTrajetId();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !trajet) {
      return;
    }

    setProcessing(true);

    try {
      // Appel au service stripePayment avec les données du trajet
      const response = await stripePayment({
        passengerId: decodedToken?.id ? String(decodedToken.id) : null,
        tripId: id || "",
        seatsReserved: 1,
      });

      const clientSecret = response.clientSecret; // Récupération du clientSecret depuis la réponse

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      // Confirmation du paiement avec Stripe
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message || "An unknown error occurred.");
      } else {
        if (paymentResult.paymentIntent?.status === "succeeded") {
          alert("Payment successful!");
        }
      }
    } catch (error) {
      setError("An error occurred during payment.");
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        height: "80%",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography>Ville départ: {trajet?.departureCity.name}</Typography>
      <Typography>Ville arrivée: {trajet?.destinationCity.name}</Typography>
      <Typography>Prix par siège: {trajet?.pricePerSeat}</Typography>
      <Typography>Places disponibles: {trajet?.availableSeats}</Typography>

      <PaymentElement />
      {error && <Typography color="error">{error}</Typography>}
      <button type="submit" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : "Pay"}
      </button>
    </Box>
  );
}
