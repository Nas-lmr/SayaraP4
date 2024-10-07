import EuroSymbolRoundedIcon from "@mui/icons-material/EuroSymbolRounded";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { IPostTrajet } from "../../interfaces/services/IPostTrajet";
import {
  capitalizeFirstLetter,
  formatDuration,
  kilometersFormat,
} from "../../services/common/ConversionValue";
import NextStepBtn from "../buttons/NextStepBtn";
import TrajetSnackbar from "./TrajetSnackbar";
import ValidationTrajet from "./ValidationTrajet";

export default function RecapTrajetCreation() {
  const [isOpen, setIsOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">(
    "success"
  );

  const { decodedToken } = useUserContext();

  const owner = decodedToken?.id || "";
  const location = useLocation();
  const {
    villeDepart,
    villeArrive,
    distance,
    duration,
    date,
    time,
    price,
    passager,
    villeAId,
    villeDId,
  } = location.state || {};

  const availableSeats = passager;
  const departure_city_id = villeDId;
  const destination_city_id = villeAId;
  const departureTime = time;
  const departureDate = date;
  const pricePerSeat = price;

  const trajetData: IPostTrajet = {
    availableSeats,
    pricePerSeat,
    departureTime,
    departureDate,
    owner,
    departure_city_id,
    destination_city_id,
    distance,
    duration,
  };

  const toggleConfirmation = () => {
    setIsOpen((prevState) => !prevState); // Inverse l'état de isOpen
  };

  const handleSuccess = () => {
    setSnackMessage("Trajet créé avec succès!");
    setSnackSeverity("success");
    setSnackOpen(true);
  };

  const handleError = (errorMessage: string) => {
    setSnackMessage(errorMessage);
    setSnackSeverity("error");
    setSnackOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          pt: "1rem",
          pb: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography
          textAlign="center"
          variant="h1"
          sx={{
            width: "85%",
            fontSize: "1.5rem",
            fontFamily: "Montserrat",
            color: "#321F47",
            fontWeight: 500,
          }}
        >
          Petite revue du trajet et c'est bon!
        </Typography>
        <Paper
          sx={{
            width: { xs: "20rem", md: "25rem" },
            height: "30rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            textAlign="center"
            variant="h2"
            sx={{
              width: "100%",
              fontSize: "1.3rem",
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 600,
              pt: "1rem",
              pb: "0.5rem",
            }}
          >
            Ton trajet
          </Typography>
          <Box
            sx={{
              width: "90%",
              height: "90%",
              pl: "1rem",
              pr: "1rem",
              pb: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",

              borderRadius: "0.5rem",
            }}
          >
            <Typography
              sx={{
                pl: "0.5rem",
                fontSize: "1rem",
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 400,
                backgroundColor: "#F4F4F4",
                borderRadius: "0.5rem",
              }}
            >
              Départ le : <b style={{ fontWeight: 500 }}>{date}</b>
            </Typography>
            <Typography
              sx={{
                pl: "0.5rem",
                fontSize: "1rem",
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 400,
                backgroundColor: "#F4F4F4",
                borderRadius: "0.5rem",
              }}
            >
              À : <b style={{ fontWeight: 500 }}>{time}</b>
            </Typography>
            <Typography
              sx={{
                pl: "0.5rem",
                fontSize: "1rem",
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 400,
                backgroundColor: "#F4F4F4",
                borderRadius: "0.5rem",
              }}
            >
              Ville de départ :{" "}
              <b style={{ fontWeight: 500 }}>
                {capitalizeFirstLetter(villeDepart)}
              </b>
            </Typography>
            <Typography
              sx={{
                pl: "0.5rem",
                fontSize: "1rem",
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 400,
                backgroundColor: "#F4F4F4",
                borderRadius: "0.5rem",
              }}
            >
              Destination :{" "}
              <b style={{ fontWeight: 500 }}>
                {capitalizeFirstLetter(villeArrive)}
              </b>
            </Typography>
            <Typography
              sx={{
                pl: "0.5rem",
                fontSize: "1rem",
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 400,
                backgroundColor: "#F4F4F4",
                borderRadius: "0.5rem",
              }}
            >
              Distance du trajet :{" "}
              <b style={{ fontWeight: 500 }}>{kilometersFormat(distance)} km</b>
            </Typography>
            <Typography
              sx={{
                pl: "0.5rem",
                fontSize: "1rem",
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 400,
                backgroundColor: "#F4F4F4",
                borderRadius: "0.5rem",
              }}
            >
              Durée du trajet :{" "}
              <b style={{ fontWeight: 500 }}>{formatDuration(duration)}</b>
            </Typography>
            <Typography
              sx={{
                pl: "0.5rem",
                fontSize: "1rem",
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 400,
                backgroundColor: "#F4F4F4",
                borderRadius: "0.5rem",
              }}
            >
              Places disponibles :<b style={{ fontWeight: 500 }}> {passager}</b>
            </Typography>
            <Typography
              sx={{
                pl: "0.5rem",
                fontSize: "1rem",
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 400,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F4F4F4",
                borderRadius: "0.5rem",
              }}
            >
              Prix par personne :{" "}
              <b
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 500,
                  paddingLeft: "0.5rem",
                }}
              >
                {price} <EuroSymbolRoundedIcon sx={{ fontSize: "1rem" }} />
              </b>
            </Typography>
          </Box>
        </Paper>
        <NextStepBtn onClick={toggleConfirmation} label="C'est parti !" />
        {isOpen && (
          <ValidationTrajet
            open={isOpen}
            onClose={() => setIsOpen(false)}
            trajetData={trajetData}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}
      </Box>
      <TrajetSnackbar
        snackOpen={snackOpen}
        message={snackMessage}
        onClose={handleSnackbarClose}
        severity={snackSeverity}
      />
    </>
  );
}
