import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { fetchPassengerReservationHistoric } from "../../services/user/ReservationHistoric";
import HistoricReservationCard from "../cards/HistoricReservationPassengerCard";
import { Box, Typography } from "@mui/material";

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

  return (
    <Box
      sx={{
        height: { xs: "90vh", sm: "87vh", md: "100vh" },
        width: "90%",
        pt: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
        pb: "2rem",
        "&::-webkit-scrollbar": {
          display: "none", // Cache la scrollbar pour les navigateurs basés sur Webkit (Chrome, Safari, etc.)
        },
        "-ms-overflow-style": "none", // Cache la scrollbar pour Internet Explorer et Edge
        "scrollbar-width": "none", // Cache la scrollbar pour Firefox
      
      }}
    >
      {" "}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Historique de mes réservations
      </Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {reservations.length > 0 ? (
        reservations &&
        reservations.map((reservation, index) => (
          <Box
            sx={{
              height: { xs: "30%", sm: "100%", md: "40%" },
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: "1rem",
            }}
          >
            <HistoricReservationCard key={index} reservation={reservation} />
          </Box>
        ))
      ) : (
        <p>No reservations found</p>
      )}
    </Box>
  );
}
