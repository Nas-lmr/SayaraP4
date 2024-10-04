import { ExpandMore, PersonRounded } from "@mui/icons-material";
import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { Reservation } from "../../interfaces/components/IHistoric";
import { formatTime } from "../../services/common/ConversionValue";

interface HistoricReservationCardProps {
  reservation: Reservation;
  index: number;
}
export default function OwnerReservationHistoricCard({
  reservation,
  index,
}: HistoricReservationCardProps) {
  const departureTime = new Date(reservation.trip.departureDateTime);

  const formattedDepartureTime = formatTime(departureTime);

  return (
    <>
      <Accordion sx={{ width: { xs: "90%", sm: "90%", md: "90%" } }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ fontFamily: "Montserrat", color: "#321F47", fontWeight: 500 }}
        >
          {" "}
          Réservation n°{index} :{" "}
          <span style={{ fontWeight: 400, marginLeft: "0.5rem" }}>
            {reservation.passenger.username}
          </span>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Box sx={{ width: "100%", display: "flex" }}>
            <Typography
              sx={{
                width: "50%",
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 500,
              }}
            >
              Départ à :{" "}
              <span style={{ fontWeight: 400 }}>{formattedDepartureTime}</span>
            </Typography>
            <Typography
              sx={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 500,
              }}
            >
              Pour :{" "}
              <span style={{ fontWeight: 400, marginLeft: "0.5rem" }}>
                {reservation.seatsReserved}
              </span>{" "}
              <PersonRounded sx={{ fontSize: "1.2rem" }} />
            </Typography>
          </Box>
          <Box sx={{ width: "100%", display: "flex", mt: "1rem" }}>
            <Typography
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 500,
              }}
            >
              Prix total:{" "}
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 600,
                  fontSize: "1.2rem",
                }}
              >
                {reservation.seatsReserved * reservation.trip.pricePerSeat}
                <EuroRoundedIcon sx={{ fontSize: "1.2rem" }} />
              </span>
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
