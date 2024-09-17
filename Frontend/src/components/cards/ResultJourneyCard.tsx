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
import { IResultCard } from "../../interfaces/components/trajet/IResultCard";
import { capitalizeFirstLetter } from "../../services/common/ConversionValue";

export default function ResultJourneyCard({ trajet }: IResultCard) {
  console.log(trajet, "DONNEE TRAJET");

  const departureCity =
    trajet.departureCity?.name || "Ville de départ inconnue";
  const arrivalCity =
    trajet.destinationCity?.name || "Ville d'arrivée inconnue";
  const price = trajet.pricePerSeat || "Prix inconnu";
  const departureDateTime = new Date(trajet.departureDateTime);

  // Formater l'heure
  const hours = departureDateTime.getHours().toString().padStart(2, "0");
  const minutes = departureDateTime.getMinutes().toString().padStart(2, "0");

  // Formatage de l'heure dans le format souhaité HH h MM
  const formattedTime = `${hours}h${minutes}`;
  return (
    <Card
      sx={{
        height: { xs: "13vh", sm: "15vh", md: "18vh", lg: "20vh" },
        width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
      }}
    >
      <CardActionArea sx={{ height: "70%", width: "100%", display: "flex" }}>
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
            {formattedTime}
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
            />{" "}
            4h45
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.8rem", sm: "1rem" },
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 500,
            }}
          >
            13h45
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
              {capitalizeFirstLetter(departureCity)}
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
