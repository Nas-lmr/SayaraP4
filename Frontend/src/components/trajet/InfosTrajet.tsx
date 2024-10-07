import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import TripOriginRoundedIcon from "@mui/icons-material/TripOriginRounded";
import {
  Box,
  Button,
  Card,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
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
  const handleSeatsChange = (e: SelectChangeEvent<number>) => {
    const newSeats = Number(e.target.value);
    // Valider l'entrée (par exemple, non-négatif, ne pas dépasser les places disponibles)
    if (newSeats >= 1 && newSeats <= (trajet?.availableSeats ?? 1)) {
      setSeatsReserved(newSeats);
    } else {
      // Optionnel : gérer les entrées non valides
    }
  };
  const availableSeats = trajet?.availableSeats ?? 0;
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
        pb: "4rem",
        backgroundColor: "#F4F4F4",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "1.4rem", sm: "1.5rem", md: "2rem" },
          color: "#321F47",
          fontFamily: "Montserrat",
          fontWeight: 400,
          pt: "1rem",
        }}
      >
        Infos du trajet
      </Typography>
      <Box
        sx={{
          width: { xs: "100%", sm: "35rem", md: "45rem" },
          height: { xs: "45%", md: "70%" },
          pt: { md: "1rem" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Card
          elevation={0}
          sx={{
            height: { xs: "30%", sm: "15vh", md: "18vh", lg: "20vh" },
            width: "100%",
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
            height: "10%",
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
            height: "10%",
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
        <Box
          sx={{
            width: "100%",
            height: "15%",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            pl: "1rem",
            pr: "1rem",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1rem", sm: "1rem" },
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 400,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Choisis un nombre de places
            <Select
              variant="outlined"
              value={seatsReserved}
              onChange={handleSeatsChange}
              sx={{
                height: "4vh",
                width: { xs: "20%", sm: "10%" },
                display: "flex",
                justifyContent: "center",
                "&:before": {
                  borderBottomColor: "#321F47",
                },
                "&:after": {
                  borderBottomColor: "#321F47",
                },
                "& .MuiSelect-select": {
                  color: "#321F47",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#321F47", // Couleur de la bordure par défaut
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#321F47", // Couleur de la bordure au hover
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#321F47", // Couleur de la bordure quand le champ est focus
                },
              }}
            >
              {Array.from({ length: availableSeats }, (_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", sm: "35rem", md: "45rem" },
          height: { xs: "35%", sm: "40%", md: "50%" },
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-around",
          pl: "1rem",
          pr: "1rem",
          mt: { lg: "0.5rem" },
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "35rem", md: "45rem" },
            height: { xs: "90%", sm: "40%", md: "50%" },
            display: "flex",
            alignItems: "center",
            flexDirection: "column",

            pl: "1rem",
            pr: "1rem",
            mt: { lg: "0.5rem" },
            backgroundColor: "white",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.1rem", sm: "1rem" },
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 500,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Informations :
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1rem", sm: "1rem" },
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 400,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pt: "1rem",
            }}
          >
            Bonjour, nous partirons de la Gare de La Part-Dieu et le lieu de
            dépose sera à la gare du Nord. Nous ferons des pauses si besoin,
            merci d'être ponctuel.
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        onClick={onclick}
        sx={{
          width: { xs: "20rem", md: "30rem" },
          height: { xs: "5vh" },
          mt: "0.5rem",
          backgroundColor: "#321F47",
          color: "#FDC55E",
          fontFamily: "Montserrat",
          borderRadius: "0.5rem",
        }}
      >
        Réserver
      </Button>
    </Box>
  );
}
