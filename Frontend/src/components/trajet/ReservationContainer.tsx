import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IInfoTrajetId } from "../../interfaces/services/IInfoTrajet";
import { trajetInfo } from "../../services/trajet/trajetService";
import StripeWrapper from "../Stripewarpper";

export default function ReservationContainer() {
  const { id } = useParams<{ id: string | undefined }>();
  const [trajet, setTrajet] = useState<IInfoTrajetId | null>(null);

  useEffect(() => {
    const fetchTrajetId = async () => {
      const trajetId = id ?? null;
      try {
        const response = await trajetInfo({ id: trajetId });
        setTrajet(response.data);
      } catch {
        console.error("pas de données");
      }
    };
    fetchTrajetId();
  }, [id]);

  return (
    <Box>
      <StripeWrapper amount={trajet?.pricePerSeat} />
    </Box>
  );
}
