import { PersonRounded } from "@mui/icons-material";
import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import TripOriginRoundedIcon from "@mui/icons-material/TripOriginRounded";
import { Box, Card, CardActionArea, Typography } from "@mui/material";
import {
  calculateArrivalDateTime,
  capitalizeFirstLetter,
  formatDuration,
  formatTime,
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
  const duretionTime = informations.duration;
  const departureTime = new Date(informations.departureDateTime);
  const parsedDurationTime =
    typeof duretionTime === "string" ? parseFloat(duretionTime) : duretionTime;

  const formattedDuretionTime = formatDuration(parsedDurationTime);
  const formattedDepartureTime = formatTime(departureTime);
  const ArrivalTime = calculateArrivalDateTime(
    departureTime,
    parsedDurationTime
  );
  const ArrivalTimeFormated = formatTime(ArrivalTime);

  return (
    <Card
      sx={{
        height: { xs: "100%", sm: "100%", md: "17vh", lg: "20vh" },
        width: { xs: "100%", sm: "100%", md: "90%", lg: "60%" },
        mt: "1.5rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CardActionArea
        sx={{
          height: "70%",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
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
        </Box>
      </CardActionArea>
    </Card>
  );
}
