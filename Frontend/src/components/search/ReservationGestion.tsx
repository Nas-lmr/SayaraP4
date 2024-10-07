import { Box, Typography } from "@mui/material";
import SearchPageBtn from "../buttons/SearchPageBtn";

export default function ReservationGestion() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { sm: "center" },
        width: { xs: "100%", sm: "50%", md: "50%", lg: "40%" },
      }}
    >
      <Typography
        textAlign="center"
        variant="h2"
        sx={{
          pl: "1rem",
          pt: "1rem",
          fontSize: "1.5rem",
          fontFamily: "Montserrat",
          fontWeight: 600,
        }}
      >
        Gères tes réservations
      </Typography>
      <Box
        sx={{
          pt: "0.5rem",
          display: "flex",
          width: { sm: "85%" },
          flexDirection: "column",
          alignItems: "center",
          gap: "0.8rem",
        }}
      >
        <SearchPageBtn
          label="Mes réservations"
          onclick={() => console.log("Mes reservations")}
        />
        <SearchPageBtn
          label="Historique"
          onclick={() => console.log("Historique")}
        />
      </Box>
    </Box>
  );
}
