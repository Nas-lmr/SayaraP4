import { Box } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

interface PaymentFormProps {
  amount: number;
}

interface ReservationDetails {
  passengerId: number;
  tripId: number;
  seatsReserved: number;
  paymentMethodId: string;
}

export default function PaymentForm({ amount }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reservationDetails = {
    passengerId: 1,  
    tripId: 14,       
    seatsReserved: 1
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; 
    }

    setProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      // Create a PaymentMethod using the CardElement
      const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
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
      const reservationData: ReservationDetails = {
        ...reservationDetails,
        paymentMethodId: paymentMethod.id,
      };

      const response = await fetch("http://localhost:3310/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Error processing payment.");
      }

      const  clientSecret  = await response.json();
console.log(clientSecret)
      // Confirm payment using the clientSecret from the backend
      const paymentResult = await stripe.confirmCardPayment(clientSecret);

      if (paymentResult.error) {
        setError(paymentResult.error.message || "An unknown error occurred.");
      } else {
        if (paymentResult.paymentIntent?.status === "succeeded") {
          alert("Payment and reservation successful!");
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err:any) {
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
