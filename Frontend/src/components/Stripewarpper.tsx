import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stripePromise from "../config/stripeConfig";
import { useUserContext } from "../context/UserContext";
import { IInfoTrajetId } from "../interfaces/services/IInfoTrajet";
import { trajetInfo } from "../services/trajet/trajetService";
import PaymentForm from "./forms/PaymentForm";
import InfosTrajet from "./trajet/InfosTrajet";


interface StripePaymentIntentProps {
  amount: number | undefined;  
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function StripePaymentIntent({ amount }: StripePaymentIntentProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [seatsReserved, setSeatsReserved] = useState<number>(1);
  const { userData } = useUserContext();
  const [trajet, setTrajet] = useState<IInfoTrajetId | null>(null); 

  const { id } = useParams<{ id: string | undefined }>();

  const reservationData = {
    seatsReserved: seatsReserved, 
    tripId: id, 
    passengerId: userData?.user?.id, 
  };
console.log(reservationData, "striperpayment intent");

  useEffect(() => {
    const fetchTrajetId = async () => {
      try {
        const response = await trajetInfo({ id: id ?? "" });
        setTrajet(response.data); 
      } catch (error) {
        console.error("Erreur lors de la récupération du trajet :", error);
      }
    };
    fetchTrajetId();
  }, [id]);

  const createReservationAndFetchClientSecret = async () => {
    setIsLoading(true);
    setErrorMessage(""); 
    try {
      const response = await fetch("http://localhost:3310/reservation", {
        method: "POST",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error("La réponse du réseau n'était pas correcte.");
      }

      const data = await response.json();

      if (data.client_secret) {
        setClientSecret(data.client_secret); 
      } else {
        setErrorMessage(
          data.message ||
            "Échec de la création de la réservation et du paiement."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du client secret :", error);
      setErrorMessage(
        "Une erreur est survenue lors de la récupération du client secret."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (errorMessage) {
    return <div>Erreur : {errorMessage}</div>;
  }

  return (
    <>
      {!clientSecret && (
        <InfosTrajet
          onclick={createReservationAndFetchClientSecret}
          seatsReserved={seatsReserved}
          setSeatsReserved={setSeatsReserved} // Fonction pour mettre à jour le nombre de places dans le parent
          tripId={id ?? ""}
          trajet={trajet} // Passage des données de trajet à l'enfant
        />
      )}

      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm
            clientSecret={clientSecret}
            seatsReserved={seatsReserved}
          />{" "}
        </Elements>
      )}
    </>
  );
}
