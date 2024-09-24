import { Box } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

interface PaymentFormProps {
  amount: number;
}

interface Product {
  passengerId: number;
  tripId: number;
  seatsReserved: number;
}

export default function PaymentForm({ amount }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Définir une liste de produits (comme exemple)
  const products: Product = {
    passengerId: 1,
    tripId: 2,
    seatsReserved: 2,
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      // Faire une requête à l'API backend pour créer un PaymentIntent
      const response = await fetch("http://localhost:3310/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products), // Envoyer les produits et la devise
      });

      console.log(response, "RESPONSE SERVICE FRONT ");

      const { clientSecret } = await response.json();

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found"); // Message d'erreur en cas de problème
      }

      // Confirmation du paiement avec Stripe
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement, // Utilise les informations de la carte ici
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message || "An unknown error occurred.");
      } else {
        if (paymentResult.paymentIntent?.status === "succeeded") {
          alert("Payment successful!");
        }
      }
    } catch {
      setError("An error occurred during payment.");
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
      <Box sx={{ height: "50%", pt: "5rem" }}>
        <CardElement
          options={{
            style: {
              base: {
                color: "purple",
                "::placeholder": {
                  color: "purple",
                  lineHeight: "1.5rem",
                },
              },
            },
          }}
        />
      </Box>
      <button type="submit" disabled={isProcessing || !stripe}>
        {isProcessing ? "Processing..." : `Pay ${amount / 100} €`}
      </button>
      {error && <div>{error}</div>}
    </Box>
  );
}
