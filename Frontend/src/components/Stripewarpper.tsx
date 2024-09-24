import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import stripePromise from "../config/stripeConfig";
import PaymentForm from "./forms/PaymentForm";

const StripeWrapper: React.FC = () => {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    fetch("http://localhost:3310/reservation")
      .then((res) => res.json())

      .then(({ clientSecret }) => setClientSecret(clientSecret));
  }, []);
  console.log(clientSecret, "client secret");
  return (
    <>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm />
      </Elements>
    </>
  );
};

export default StripeWrapper;
