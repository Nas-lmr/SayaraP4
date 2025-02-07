import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Box, Typography } from "@mui/material";
import { formatDateDisplay,formatTime } from "../../services/common/ConversionValue";
import { Notification } from "../../interfaces/notification/notification";

interface DetailNotificationProps {
  informations: Notification; 
}


export default function DetailNotification({ informations }: DetailNotificationProps) {

const formateDateTime = new Date(informations.tripId.departureDateTime)

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        p: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontSize: "0.8rem",
            fontFamily: "Montserrat",
            fontWeight: 500,
            color: "#321F47",
          }}
        >
          {formatDateDisplay(formateDateTime)} à {formatTime(formateDateTime)}
        </Typography>
        <Typography
          alignContent="center"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            fontSize: "0.8rem",
            fontFamily: "Montserrat",
            fontWeight: 500,
            color: "#321F47",
            width: "10%",
          }}
        >
           {informations.reservationId.seatsReserved}

          <PersonRoundedIcon
            sx={{
              fontSize: "1rem",
              color: "#321F47",
            }}
          />
        </Typography>
      </Box>
      <Box sx={{ width: "100%", display: "flex" }}>
        <Typography
          sx={{
            width: "fit-content",
            pr: "0.5rem",
            fontSize: "0.8rem",
            fontFamily: "Montserrat",
            fontWeight: 500,
            color: "#321F47",
          }}
        >
          {informations.tripId.departureCity.name}
        </Typography>
        <ArrowRightAltRoundedIcon
          sx={{
            fontSize: "1.5rem",
            color: "#321F47",
          }}
        />
        <Typography
          sx={{
            width: "30%",
            pl: "0.5rem",
            fontSize: "0.8rem",
            fontFamily: "Montserrat",
            fontWeight: 500,
            color: "#321F47",
          }}
        >
          {informations.tripId.destinationCity.name}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: "0.8rem",
          fontFamily: "Montserrat",
          fontWeight: 500,
          color: "#321F47",
        }}
      >
      </Typography>
    </Box>
  );
}
