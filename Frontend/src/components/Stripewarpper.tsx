import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../config/stripeConfig";
import PaymentForm from "./forms/PaymentForm";

// interface StripeWrapperProps {
//   amount: number;
// }

const StripeWrapper: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeWrapper;
