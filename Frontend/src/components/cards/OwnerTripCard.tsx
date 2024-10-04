import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import TrendingFlatRoundedIcon from "@mui/icons-material/TrendingFlatRounded";
import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HommeHeureux from "../../assets/images/HommeHeureux.png";
import HommeVoiture from "../../assets/images/HommeVoitureMoyen.png";
import {
  capitalizeFirstLetter,
  formatDateDisplay,
} from "../../services/common/ConversionValue";

interface Trip {
  duration: string;
  id: number;
  availableSeats: number;
  departureCity: { name: string };
  destinationCity: { name: string };
  pricePerSeat: number;
  departureDateTime: string;
}

interface HistoricReservationCardProps {
  informations: Trip;
}
export default function OwnerTripCard({
  informations,
}: HistoricReservationCardProps) {
  const departureTime = new Date(informations.departureDateTime);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/trajet/mes-trajets/historique/${informations.id}`); // Rediriger vers la page avec l'ID du voyage
  };

  return (
    <Card
      sx={{
        height: { xs: "100%", sm: "90%", md: "17vh", lg: "20vh" },
        width: { xs: "100%", sm: "100%", md: "90%", lg: "60%" },
        backgroundImage: {
          sm:
            informations.availableSeats === 0
              ? `url(${HommeHeureux})`
              : informations.availableSeats > 0 &&
                informations.availableSeats <= 3
              ? `url(${HommeVoiture})`
              : "",
        },
        backgroundSize: { sm: "33%", md: "30%", lg: "40%" },
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CardActionArea
        onClick={handleCardClick}
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            pt: { xs: "0.5rem", sm: 0 },

            display: "flex",
            justifyContent: { xs: "space-between", sm: "space-around" },
            flexDirection: "column",
            pl: "0.5rem",
            height: "100%",
            width: "50%",
          }}
        >
          <Typography
            sx={{
              display: "flex",

              fontSize: { xs: "0.9rem", sm: "1rem" },
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 500,
            }}
          >
            Date :
            <span style={{ fontWeight: 400, marginLeft: "0.5rem" }}>
              {formatDateDisplay(departureTime)}
            </span>
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 500,
            }}
          >
            Trajet:{" "}
            <span
              style={{
                fontWeight: 400,
                display: "flex",
                alignItems: "center",
                marginLeft: "0.5rem",
              }}
            >
              {" "}
              {capitalizeFirstLetter(informations.departureCity.name || "")}
              <TrendingFlatRoundedIcon
                sx={{ color: "#321F47" }}
                fontSize="large"
              />
              {capitalizeFirstLetter(informations.destinationCity.name || "")}
            </span>
          </Typography>
        </Box>
        <Box
          sx={{
            pt: { xs: "0.5rem", sm: 0 },
            pb: { xs: "0.5rem", sm: 0 },
            pr: "0.5rem",
            display: "flex",
            justifyContent: { xs: "space-between", sm: "space-around" },
            flexDirection: "column",
            alignItems: "flex-end",
            height: "100%",
            width: "45%",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 500,
            }}
          >
            {informations.availableSeats === 0 ? (
              <span
                style={{
                  fontWeight: 600,
                  color: "green",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                COMPLET{" "}
                {
                  <ThumbUpAltRoundedIcon
                    sx={{ ml: "0.2rem", fontSize: "1rem" }}
                  />
                }
              </span>
            ) : (
              <>
                Place dispo :{" "}
                <span style={{ fontWeight: 400, marginLeft: "0.5rem" }}>
                  {informations.availableSeats}
                </span>
              </>
            )}
          </Typography>

          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 500,
            }}
          >
            Plus d'infos{" "}
            {<ArrowForwardIosRoundedIcon sx={{ fontSize: "1rem" }} />}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}

{
  /* <Box
          sx={{
            width: { xs: "15%", md: "20%" },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
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
            {formattedDuretionTime}
            <QueryBuilderRoundedIcon
              sx={{
                color: "#7E7E7E",
                fontSize: { xs: "0.6rem", sm: "0.8rem" },
                fontFamily: "Montserrat",
                fontWeight: 600,
              }}
            />
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.8rem", sm: "1rem" },
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 500,
            }}
          >
            {ArrivalTimeFormated}
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
              {capitalizeFirstLetter(informations.departureCity.name || "")}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "1rem" },
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 500,
              }}
            >
              {capitalizeFirstLetter(informations.destinationCity.name || "")}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            {" "}
            <Typography
              sx={{
                fontSize: { xs: "1.rem", sm: "1.5rem" },
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
              }}
            >
              {informations.availableSeats > 1 ? "Places" : "Place"}
              {informations.availableSeats} <PersonRounded />
            </Typography>
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
              {informations.pricePerSeat}
              <EuroRoundedIcon
                sx={{
                  fontSize: "1rem",
                  color: "#321F47",
                }}
              />
            </Typography>
          </Box>
        </Box> */
}
