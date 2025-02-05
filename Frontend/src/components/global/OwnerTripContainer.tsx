import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { fetchOwnerTrip } from "../../services/user/OwnerTrip";
import ReturnPreviousBtn from "../buttons/ReturnPreviousBtn";
import OwnerTripCard from "../cards/OwnerTripCard";

export default function OwnerTripContainer() {
  const [informations, setInformations] = useState([]);
  const [error, setError] = useState(null);
  const { userData } = useUserContext();
  const id = userData?.user?.id;

  useEffect(() => {
    if (id) {
      fetchOwnerTrip(id)
        .then((response) => {
          
          if (response.success) {
            setInformations(response.data);
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
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "1.4rem", sm: "1.5rem", md: "2rem" },
          fontWeight: 500,
          textAlign: "center",
          fontFamily: "Montserrat",
        }}
      >
        Historique de mes trajets
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "7%",
          pt: "0.5rem",
        }}
      >
        <ReturnPreviousBtn />
      </Box>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {informations ? (
        informations.map((information, index) => (
          <Box
            key={index}
            sx={{
              height: { xs: "15%", sm: "100%", md: "40%" },
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: "1rem",
            }}
          >
            <OwnerTripCard key={index} informations={information} />
          </Box>
        ))
      ) : (
        <p>Aucun trajet trouvé</p>
      )}
    </Box>
  );
}
