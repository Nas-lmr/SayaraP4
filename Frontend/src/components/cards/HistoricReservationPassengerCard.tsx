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
import { PersonRounded } from "@mui/icons-material";
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import {
  formatDuration,
  calculateArrivalDateTime,
  formatTime,
  capitalizeFirstLetter
} from "../../services/common/ConversionValue";


interface Passenger {
  id: number;
  username: string;
  email: string;
}

interface Trip {
  duration: string;
  id: number;
  ownerName:string;
  departureCity: string;
  destinationCity: string;
  pricePerSeat: number;
  departureDateTime: string;
}

interface Reservation {
  reservationId: number;
  passenger: Passenger;
  trip: Trip;
  seatsReserved: number;
  reservationTime: string;
}

interface HistoricReservationCardProps {
  reservation: Reservation;
}
export default function HistoricReservationCard({
  reservation,
}: HistoricReservationCardProps) {
  const duretionTime = reservation.trip.duration;
  const departureTime = new Date(reservation.trip.departureDateTime);
  const parsedDurationTime =
    typeof duretionTime === "string" ? parseFloat(duretionTime) : duretionTime;


  const formattedDuretionTime = formatDuration(parsedDurationTime);
  const formattedDepartureTime = formatTime(departureTime);
  const ArrivalTime = calculateArrivalDateTime(
    departureTime,
    parsedDurationTime
  );
const ArrivalTimeFormated = formatTime(ArrivalTime)
  return (
    <Card
      sx={{
        height: { xs: "100%", sm: "100%", md: "17vh", lg: "20vh" },
        width: { xs: "100%", sm: "100%", md: "90%", lg: "60%" },
        mt:"1.5rem", 
      
      }}
    >
      <CardActionArea sx={{ height: "70%", width: "100%", display: "flex" }}>
        <Box
          sx={{
            width: { xs: "15%", md: "20%" },
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
              { capitalizeFirstLetter(reservation.trip.departureCity)}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.8rem", sm: "1rem" },
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 500,
              }}
            >
              {capitalizeFirstLetter(reservation.trip.destinationCity) }
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
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
              }}
            >
              {reservation.seatsReserved} <PersonRounded />
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
              {reservation.trip.pricePerSeat}
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
            display:"flex",
            alignItems:"center",
            gap:"0.5rem"
          }}
        >
       {<DirectionsCarRoundedIcon/> }  Conducteur:  {reservation.trip.ownerName}
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
