import { Box, TextField, Typography } from "@mui/material";
import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { IInfoTrajetId } from "../interfaces/services/IInfoTrajet";
import { IStripeProduct } from "../interfaces/services/IStripeProduct";
import { trajetInfo } from "../services/trajet/trajetService";

interface PaymentFormProps {
  amount: number | null;
}

export default function Stripecpnt({ amount }: PaymentFormProps) {
  const { id } = useParams<{ id: string | undefined }>(); // Récupération de l'ID du trajet à partir de l'URL
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trajet, setTrajet] = useState<IInfoTrajetId | null>(null); // Pour stocker les infos du trajet
  const [seatsReserved, setSeatsReserved] = useState<number>(1);
  const { decodedToken } = useUserContext();

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

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const cardElement = elements.getElement(PaymentElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      // Create a PaymentMethod using the CardElement
      const { paymentMethod, error: stripeError } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

      if (stripeError) {
        setError(stripeError.message || "An error occurred during payment.");
        setProcessing(false);
        return;
      }

      if (!paymentMethod) {
        setError("Payment method not created.");
        setProcessing(false);
        return;
      }

      // Add the paymentMethodId to the reservation details
      const reservationData: IStripeProduct = {
        passengerId: decodedToken?.id ?? null, // Récupère l'ID réel de l'utilisateur
        tripId: id || "", // Utilise l'ID du trajet
        seatsReserved: seatsReserved, // Utilisation de l'état pour les places réservées
        paymentMethodId: paymentMethod.id,
      };

      const response = await fetch("http://localhost:3310/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });

      console.log(response, "RESPONSE");

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Error processing payment.");
      }

      const { clientSecret } = await response.json();
      console.log(clientSecret, "CLIENT SECRET FRONT");

      // Confirm payment using the clientSecret from the backend
      const paymentResult = await stripe.confirmCardPayment(clientSecret);

      // Confirmation du paiement avec Stripe

      if (paymentResult.error) {
        setError(paymentResult.error.message || "An unknown error occurred.");
      } else {
        if (paymentResult.paymentIntent?.status === "succeeded") {
          alert("Payment and reservation successful!");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An error occurred during payment.");
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
      <TextField
        label="Nombre de places réservées"
        type="number"
        value={seatsReserved}
        onChange={(e) => setSeatsReserved(Number(e.target.value))}
        sx={{ marginBottom: 2 }}
      />

      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
              padding: "10px 12px", // Ajout d'espacement interne
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      <button type="submit" disabled={isProcessing || !stripe}>
        {isProcessing ? "Processing..." : `Pay ${amount * seatsReserved} €`}
      </button>
      {error && <div>{error}</div>}
    </Box>
  );
}
