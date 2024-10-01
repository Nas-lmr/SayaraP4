import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { fetchOwnerTripReservationHistoric } from "../../services/user/OwnerTrip";
import OwnerReservationHistoricCard from "../cards/OwnerReservationHistoricCard";

export default function OwnerReservationHistoricContainer() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const { decodedToken } = useUserContext();
  const id = decodedToken?.id;
  const tripId = useParams();

  useEffect(() => {
    if (id && tripId) {
      fetchOwnerTripReservationHistoric(id, tripId.id)
        .then((response) => {
          if (response.success) {
            setReservations(response.data);
            console.log(response.data, "RESERVATION");
          } else {
            setError(response.error);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id, tripId]);

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
          fontWeight: 500,
          textAlign: "center",
          fontFamily: "Montserrat",
        }}
      >
        Réservations du trajet
      </Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {reservations.length > 0 ? (
        reservations.map((reservation, index) => (
          <Box
            key={index}
            sx={{
              height: { xs: "30%", sm: "100%", md: "40%" },
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: "1rem",
            }}
          >
            <OwnerReservationHistoricCard
              key={index}
              reservation={reservation}
            />
          </Box>
        ))
      ) : (
        <p>No reservations found</p>
      )}
    </Box>
  );
}
