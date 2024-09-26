import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import TripOriginRoundedIcon from "@mui/icons-material/TripOriginRounded";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { IStripeProduct } from "../../interfaces/services/IStripeProduct";
import {
  calculateArrivalDateTime,
  capitalizeFirstLetter,
  formatDuration,
  formatTime,
} from "../../services/common/ConversionValue";

export default function InfosTrajet({
  onclick,
  seatsReserved,
  setSeatsReserved,
  trajet,
}: IStripeProduct) {
  const handleSeatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSeats = Number(e.target.value);
    // Valider l'entrée (par exemple, non-négatif, ne pas dépasser les places disponibles)
    if (newSeats >= 1 && newSeats <= (trajet?.availableSeats ?? 1)) {
      setSeatsReserved(newSeats);
    } else {
      // Optionnel : gérer les entrées non valides
    }
  };

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

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        pt: "4rem",
        pb: "3rem",
        backgroundColor: "#F4F4F4",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "1.4rem", sm: "1.5rem", md: "2rem" },
          color: "#321F47",
          fontFamily: "Montserrat",
          fontWeight: 400,
        }}
      >
        Infos du trajet
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "35%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Card
          elevation={0}
          sx={{
            height: { xs: "50%", sm: "15vh", md: "18vh", lg: "20vh" },
            width: { xs: "100%", sm: "80%", md: "70%", lg: "60%" },
            display: "flex",
            p: "0.5rem",
          }}
        >
          <Box
            sx={{
              width: { xs: "15%", md: "10%" },
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: { sm: "center" },
              justifyContent: "space-around",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "1rem" },
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 500,
              }}
            >
              {formattedDepartureTime}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.6rem", sm: "0.8rem" },
                fontFamily: "Montserrat",
                color: "#7E7E7E",
                fontWeight: 500,
                pl: { xs: "0.5rem", sm: "1rem" },
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
                fontSize: { xs: "0.8rem", sm: "1rem" },
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
              height: "100%",
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
                height: "50%",
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
              width: "60%",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "60%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Typography
                sx={{
                  height: "50%",
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  fontFamily: "Montserrat",
                  color: "#321F47",
                  fontWeight: 500,
                }}
              >
                {capitalizeFirstLetter(trajet?.departureCity.name ?? "")}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  fontFamily: "Montserrat",
                  color: "#321F47",
                  fontWeight: 500,
                }}
              >
                {capitalizeFirstLetter(trajet?.destinationCity.name ?? "")}
              </Typography>
            </Box>
          </Box>
        </Card>
        <Box
          sx={{
            width: "100%",
            height: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pl: "1rem",
            pr: "1rem",
            backgroundColor: "white",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1rem", sm: "1rem" },
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 400,
              width: "95%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {trajet?.availableSeats ?? 0 > 1
              ? "Places disponibles"
              : "Place disponible"}
            <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              {trajet?.availableSeats}
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
            width: "100%",
            height: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pl: "1rem",
            pr: "1rem",
            backgroundColor: "white",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1rem", sm: "1rem" },
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 400,
              width: "95%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Prix pour une place{" "}
            <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              {trajet?.pricePerSeat}
            </span>
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
          width: "100%",
          height: "35%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pl: "1rem",
          pr: "1rem",
          backgroundColor: "white",
        }}
      >
        <TextField
          label="Nombre de places réservées"
          type="number"
          value={seatsReserved}
          onChange={handleSeatsChange}
          sx={{ marginBottom: 2 }}
        />
      </Box>
      <Button
        variant="contained"
        onClick={onclick}
        sx={{
          width: { xs: "20rem", md: "30rem" },
          height: { xs: "5vh" },
          backgroundColor: "#321F47",
          fontFamily: "Montserrat",
          borderRadius: "0.5rem",
        }}
      >
        Réserver
      </Button>
    </Box>
  );
}
