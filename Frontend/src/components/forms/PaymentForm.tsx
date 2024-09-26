import { Box } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

interface PaymentFormProps {
  clientSecret: string; // Accept clientSecret as a prop
}

interface valid {
  error?: string;
  message?: string;
  status?: string;
}

export default function PaymentForm({ clientSecret }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null); // Reset error

    try {
      // First submit the elements
      const submitResult = await elements.submit();
      if (submitResult.error) {
        // Handle any error from elements submission
        setError(submitResult.error.message);
        return;
      }

      // Confirm the payment after successful element submission
      const paymentResult = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:5173", // Optional return URL
        },
        clientSecret, // Include the clientSecret here
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message || "An unknown error occurred.");
      } else if (paymentResult.status === "succeeded") {
        alert("Payment successful!");
      }

      console.log(paymentResult, "Payment result");
    } catch (error) {
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
        <PaymentElement /> {/* Stripe's PaymentElement */}
      </Box>
      <button type="submit" disabled={isProcessing || !stripe}>
        {isProcessing ? "Processing..." : `Pay`}
      </button>
      {error && <div>{error}</div>}
    </Box>
  );
}
