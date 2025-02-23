import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import TripOriginRoundedIcon from "@mui/icons-material/TripOriginRounded";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Divider,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { IResultCard } from "../../interfaces/components/trajet/IResultCard";
import {
  calculateArrivalDateTime,
  capitalizeFirstLetter,
  formatDuration,
  formatTime,
} from "../../services/common/ConversionValue";

export default function ResultJourneyCard({ trajet }: IResultCard) {
  const departureCity =
    trajet.departureCity?.name || "Ville de départ inconnue";
  const arrivalCity =
    trajet.destinationCity?.name || "Ville d'arrivée inconnue";
  const price = trajet.pricePerSeat || "Prix inconnu";
  const departureDateTime = new Date(trajet.departureDateTime);
  const durationInSeconds = trajet.duration; // La durée est en secondes

  // Calculer l'heure d'arrivée
  const arrivalDateTime = calculateArrivalDateTime(
    departureDateTime,
    durationInSeconds
  );

  // Formater l'heure de départ et l'heure d'arrivée
  const formattedDepartureTime = formatTime(departureDateTime);
  const formattedArrivalTime = formatTime(arrivalDateTime);
  return (
    <Card
      sx={{
        height: { xs: "13vh", sm: "15vh", md: "18vh", lg: "20vh" },
        width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
      }}
    >
      <NavLink
        to={
          trajet.availableSeats > 0
            ? `/trajet/reservation/${trajet.id}/infos-trajet`
            : ""
        }
        style={{
          textDecoration: "none",
          pointerEvents: trajet.availableSeats > 0 ? "auto" : "none", // Désactiver le lien si aucun siège n'est disponible
          opacity: trajet.availableSeats > 0 ? 1 : 0.5, // Modifier l'opacité pour indiquer un état désactivé
          cursor: trajet.availableSeats > 0 ? "pointer" : "not-allowed", // Indiquer à l'utilisateur que le lien est désactivé
        }}
      >
        <CardActionArea
          disableRipple
          sx={{ height: "70%", width: "100%", display: "flex" }}
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
              {formatDuration(durationInSeconds)}
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
                component="span"
                sx={{
                  height: "50%",
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  fontFamily: "Montserrat",
                  color: "#321F47",
                  fontWeight: 500,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {capitalizeFirstLetter(departureCity)}
                <Box
                  component="span"
                  sx={{
                    display: "flex",
                    gap: "0.2rem",
                  }}
                >
                  {Array.from({ length: trajet.availableSeats }).map(
                    (_, index) => (
                      <Box
                        key={index}
                        sx={{
                          backgroundColor: "#6AE35F",
                          borderRadius: "50%",
                          width: "0.8rem",
                          height: "0.8rem",
                        }}
                      />
                    )
                  )}
                </Box>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  fontFamily: "Montserrat",
                  color: "#321F47",
                  fontWeight: 500,
                }}
              >
                {capitalizeFirstLetter(arrivalCity)}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
              }}
            >
              {price}
              <EuroRoundedIcon
                sx={{
                  fontSize: "1rem",
                  color: "#321F47",
                }}
              />
            </Typography>
          </Box>
        </CardActionArea>
      </NavLink>
      <Divider />
      <Box
        sx={{
          pl: "0.5rem",
          pr: "0.5rem",
          height: "30%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            width: "70%",
            fontSize: "0.9rem",
            fontFamily: "Montserrat",
            color: "#321F47",
            fontWeight: 500,
          }}
        >
          Aristide
        </Typography>
        <Button
          endIcon={<KeyboardArrowRightRoundedIcon />}
          sx={{
            width: { xs: "35%", sm: "25%", md: "20%" },
            height: "100%",
            p: 0,
            fontSize: "0.9rem",
            fontFamily: "Montserrat",
            color: "#321F47",
            textTransform: "none",
            fontWeight: 400,
          }}
        >
          Voir profil
        </Button>
      </Box>
    </Card>
  );
}
