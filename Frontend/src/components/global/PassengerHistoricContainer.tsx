import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { fetchPassengerReservationHistoric } from "../../services/user/ReservationHistoric";
import HistoricReservationCard from "../cards/HistoricReservationPassengerCard";
import { Box } from "@mui/material";

export default function PassengerHistoricContainer() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const { decodedToken } = useUserContext();
  const id = decodedToken?.id;

  useEffect(() => {
    if (id) {
      fetchPassengerReservationHistoric(id)
        .then((response) => {
          if (response.success) {
            setReservations(response.data);
          } else {
            setError(response.error);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);
  console.log(reservations, "EEEEEEEEEEEEEEEEEEEEEE");

  return (
    <Box
      sx={{
        height: "120vh",
        width: "90%",
        pt: "1rem",
        display: "flex",
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
      }}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}
      {reservations.length > 0 ? (
        reservations &&
        reservations.map((reservation, index) => (
          <HistoricReservationCard key={index} reservation={reservation} />
        ))
      ) : (
        <p>No reservations found</p>
      )}
    </Box>
  );
}
