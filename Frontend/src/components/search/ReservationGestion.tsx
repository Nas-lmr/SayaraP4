import { Box, Typography } from "@mui/material";
import SearchPageBtn from "../buttons/SearchPageBtn";

export default function ReservationGestion() {
  return (
    <>
      <Typography
        textAlign="start"
        variant="h2"
        sx={{
          pl: "1rem",
          fontSize: "1.5rem",
          fontFamily: "Montserrat",
          fontWeight: 600,
        }}
      >
        Gères tes réservations
      </Typography>
      <Box
        sx={{
          pr: "1rem",
          pl: "1rem",
          height: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
    </>
  );
}
