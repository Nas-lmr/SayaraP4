import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../config/stripeConfig";
import Stripecpnt from "./Stripecpnt";

interface StripeWrapperProps {
  amount: number;
}

const StripeWrapper: React.FC<StripeWrapperProps> = ({ amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <Stripecpnt amount={amount} />
    </Elements>
  );
};

export default StripeWrapper;
