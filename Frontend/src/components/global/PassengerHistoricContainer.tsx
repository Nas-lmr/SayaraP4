import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { fetchPassengerReservationHistoric } from "../../services/user/ReservationHistoric";
import ReturnPreviousBtn from "../buttons/ReturnPreviousBtn";
import HistoricReservationCard from "../cards/HistoricReservationPassengerCard";

export default function PassengerHistoricContainer() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const { userData } = useUserContext();
  const id = userData?.user?.id;

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
        "&::-webkitScrollbar": {
          display: "none", // Cache la scrollbar pour les navigateurs basés sur Webkit (Chrome, Safari, etc.)
        },
        "MsOverflowStyle": "none", // Cache la scrollbar pour Internet Explorer et Edge
        "scrollbarWidth": "none", // Cache la scrollbar pour Firefox
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ReturnPreviousBtn />
        <Typography
          textAlign="center"
          variant="h1"
          sx={{
            fontSize: { xs: "1.4rem", sm: "1.7rem", md: "1.8rem" },
            fontWeight: 500,
            fontFamily: "Montserrat",
          }}
        >
          Historique des réservations
        </Typography>
      </Box>
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
