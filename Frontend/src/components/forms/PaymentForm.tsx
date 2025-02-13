import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import TripOriginRoundedIcon from "@mui/icons-material/TripOriginRounded";
import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Covoiturage from "../../assets/images/covoiturage.png";
import { IInfoTrajetId } from "../../interfaces/services/IInfoTrajet";
import {
  calculateArrivalDateTime,
  capitalizeFirstLetter,
  formatDuration,
  formatTime,
} from "../../services/common/ConversionValue";
import { trajetInfo } from "../../services/trajet/trajetService";
import TrajetSnackbar from "../trajet/TrajetSnackbar";

interface PaymentFormProps {
  clientSecret: string;
  seatsReserved: number;
}

export default function PaymentForm({
  clientSecret,
  seatsReserved,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trajet, setTrajet] = useState<IInfoTrajetId | null>(null);
  const { id } = useParams<{ id: string | undefined }>();
  const [snackOpen, setSnackOpen] = useState(false); // Gère l'ouverture du Snackbar
  const [snackMessage, setSnackMessage] = useState(""); // Message du Snackbar
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">(
    "success"
  );

  const departureDateTime = new Date(trajet?.departureDateTime ?? "");
  const durationInSeconds = trajet?.duration; // La durée est en secondes

  // Calculer l'heure d'arrivée
  const arrivalDateTime = calculateArrivalDateTime(
    departureDateTime,
    durationInSeconds ?? 0
  );

  // Formater l'heure de départ et l'heure d'arrivée
  const formattedDepartureTime = formatTime(departureDateTime);
  const formattedArrivalTime = formatTime(arrivalDateTime);

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
    setError(null); // Reset error

    try {
      // First submit the elements
      const submitResult = await elements.submit();
      if (submitResult.error) {
        setError(submitResult.error.message || "Erreur lors de la soumission.");
        setSnackSeverity("error"); // Afficher en tant qu'erreur
        setSnackMessage(submitResult.error.message || "Erreur de paiement.");
        setSnackOpen(true); // Ouvrir le snackbar pour montrer l'erreur
        return;
      }

      // Confirm the payment after successful element submission
      const paymentResult = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // return_url: "http://localhost:5173",
          return_url: `${import.meta.env.VITE_FRONTEND_PROD_URL}`,
        },
        clientSecret,
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message || "Une erreur est survenue.");
        setSnackSeverity("error");
        setSnackMessage(
          paymentResult.error.message || "Erreur lors du paiement."
        );
        setSnackOpen(true);
      } else {
        // Paiement réussi, affiche le Snackbar
        setSnackSeverity("success");
        setSnackMessage("Le paiement a été effectué avec succès !");
        setSnackOpen(true);
      }
    } catch (error) {
      console.error(error);
      setSnackSeverity("error");
      setSnackMessage("Une erreur est survenue pendant le paiement.");
      setSnackOpen(true);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F4F4F4",
        alignItems: "center",
        pt: "4rem",
        pb: "4.5rem",
        pl: "1rem",
        pr: "1.5rem",
        gap: "0.5rem",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "1.4rem", sm: "1.5rem", md: "2rem" },
          color: "#321F47",
          fontFamily: "Montserrat",
          fontWeight: 500,
          pt: { xs: "1rem", md: "1.5rem" },
        }}
      >
        Dernière étape et c'est parti !
      </Typography>
      <Box
        sx={{
          height: "100%",
          width: { xs: "100%", sm: "35rem", md: "100%" },
          display: "flex",
          alignItems: "center",

          gap: "0.5rem",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            height: { xs: "25%", sm: "35%", md: "94%" },
            width: { xs: "100%", sm: "35rem", md: "100%", lg: "90%" },
            display: "flex",
            alignItems: "center",
            // justifyContent: { md: "space-between" },
            gap: "0.5rem",
            flexDirection: "column",
            pt: "1rem",
          }}
        >
          <Card
            elevation={0}
            sx={{
              height: { xs: "70%", sm: "100%", md: "21.3rem" },
              width: { xs: "100%", sm: "90%", md: "95%" },
              display: "flex",
              alignItems: { md: "center" },
              p: "0.5rem",
            }}
          >
            <Box
              sx={{
                width: { xs: "15%", md: "15%", lg: "10%" },
                height: { xs: "100%", md: "90%" },
                display: "flex",
                flexDirection: "column",
                alignItems: { sm: "center" },
                justifyContent: "space-around",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", sm: "1rem", md: "1.1rem" },
                  fontFamily: "Montserrat",
                  color: "#321F47",
                  fontWeight: 500,
                }}
              >
                {formattedDepartureTime}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                  fontFamily: "Montserrat",
                  color: "#7E7E7E",
                  fontWeight: 500,
                  pl: { xs: "0.2rem", sm: "1rem" },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <QueryBuilderRoundedIcon
                  sx={{
                    color: "#7E7E7E",
                    fontSize: { xs: "0.6rem", sm: "0.8rem" },
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                  }}
                />
                {formatDuration(durationInSeconds ?? 0)}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", sm: "1rem", md: "1.1rem" },
                  fontFamily: "Montserrat",
                  color: "#321F47",
                  fontWeight: 500,
                }}
              >
                {formattedArrivalTime}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "7%",
                height: { xs: "100%", md: "90%" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TripOriginRoundedIcon
                sx={{
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  color: "#321F47",
                }}
              />
              <Box
                sx={{
                  height: { xs: "50%", md: "60%" },
                  width: 5,
                  backgroundColor: "#321F47",
                  borderRadius: "0.5rem",
                }}
              />
              <TripOriginRoundedIcon
                sx={{
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  color: "#321F47",
                }}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "60%", md: "40%" },
                height: { xs: "100%", md: "65%" },
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: "60%",
                  height: { xs: "100%", md: "100%" },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: { xs: "space-around", md: "space-between" },
                }}
              >
                <Typography
                  sx={{
                    height: { xs: "50%", md: "" },
                    fontSize: { xs: "0.8rem", sm: "1rem", md: "1.1rem" },
                    fontFamily: "Montserrat",
                    color: "#321F47",
                    fontWeight: 500,
                  }}
                >
                  {capitalizeFirstLetter(trajet?.departureCity.name ?? "")}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "0.8rem", sm: "1rem", md: "1.1rem" },
                    fontFamily: "Montserrat",
                    color: "#321F47",
                    fontWeight: 500,
                  }}
                >
                  {capitalizeFirstLetter(trajet?.destinationCity.name ?? "")}
                </Typography>
              </Box>
            </Box>
            <Box
              component="img"
              src={Covoiturage}
              alt="Deux hommes discutent"
              sx={{
                display: { xs: "none", sm: "flex" },
                width: { md: "80%", lg: "60%" },
              }}
            />
          </Card>
          <Box
            sx={{
              width: { xs: "100%", sm: "90%", md: "95%" },
              height: { xs: "30%", md: "15%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pl: "1rem",
              pr: "1rem",
              mt: { xs: "0.5rem", md: "0.5rem", lg: 0 },
              borderRadius: "0.3rem",
              backgroundColor: "white",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1rem", md: "1.1rem" },
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 400,
                width: "95%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {seatsReserved ?? 0 > 1 ? "Places réservées" : "Place réservée"}
              <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                {seatsReserved}
              </span>
            </Typography>
            <PersonRoundedIcon
              sx={{
                fontSize: "1.1rem",
                color: "#321F47",
              }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "95%" },
              height: { xs: "30%", md: "15%" },
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "space-between",
              pl: "1rem",
              pr: "1rem",
              mt: { xs: "0.5rem", md: "0.5rem", lg: 0 },
              backgroundColor: "white",
              borderRadius: "0.3rem",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1rem", md: "1.1rem" },
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 400,
                width: "95%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Prix total à payer
              {trajet?.pricePerSeat !== undefined && (
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  {(trajet.pricePerSeat * seatsReserved).toFixed(2)}
                </span>
              )}
            </Typography>
            <EuroRoundedIcon
              sx={{
                fontSize: "1.1rem",
                color: "#321F47",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            minHeight: "100%",
            width: { xs: "100%", sm: "90%", md: "45rem" },
            height: { xs: "60%", sm: "55%", md: "90%" },
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "space-around", sm: "space-around" },
            flexDirection: "column",
            p: "1rem",
            mt: "0.5rem",
            borderRadius: "0.5rem",
            backgroundColor: "white",
          }}
        >
          <PaymentElement />
          {error}
          <Button
            type="submit"
            disabled={isProcessing || !stripe}
            sx={{
              width: { xs: "90%", sm: "80%", md: "85%" },
              height: { xs: "5vh" },
              mt: "0.5rem",
              backgroundColor: "#321F47",
              color: isProcessing ? "white" : "white",
              fontFamily: "Montserrat",
              borderRadius: "0.5rem",
              fontSize: "1.3rem",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            {isProcessing ? (
              <CircularProgress size={30} sx={{ color: "white" }} />
            ) : (
              `Payez ${(trajet?.pricePerSeat ?? 0) * seatsReserved}`
            )}

            <EuroRoundedIcon
              sx={{
                fontSize: "1.3rem",
                display: isProcessing ? "none" : "block",
              }}
            />
          </Button>
        </Box>
      </Box>
      <TrajetSnackbar
        snackOpen={snackOpen}
        message={snackMessage}
        onClose={() => setSnackOpen(false)}
        severity={snackSeverity}
      />
    </Box>
  );
}
