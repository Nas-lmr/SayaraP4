import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import StripePaymentIntent from "./Stripewarpper";

interface ProtectedStripePaymentProps {
  amount?: number; // Rend 'amount' optionnel si besoin
}

export default function ProtectedStripePaymentIntent({
  amount,
}: ProtectedStripePaymentProps) {
  const { userData } = useUserContext();

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return <StripePaymentIntent amount={amount} />;
}
