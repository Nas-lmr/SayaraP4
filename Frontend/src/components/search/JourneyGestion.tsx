import { Box, Typography } from "@mui/material";
import SearchPageBtn from "../buttons/SearchPageBtn";

export default function JourneyGestion() {
  return (
    <>
      <Typography
        textAlign="start"
        variant="h2"
        sx={{
          pt: "1rem",
          pl: "1rem",
          fontSize: "1.5rem",
          fontFamily: "Montserrat",
          fontWeight: 600,
        }}
      >
        Gères tes trajets
      </Typography>
      <Box
        sx={{
          pr: "1rem",
          pl: "1rem",
          height: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.8rem",
        }}
      >
        <SearchPageBtn
          label="Nouveau trajet"
          onclick={() => console.log("Nouveau trajet")}
          type="button"
        />
        <SearchPageBtn
          label="Mes trajets"
          onclick={() => console.log("Mes trajets")}
          type="button"
        />
        <SearchPageBtn
          label="Mes trajets effectués"
          onclick={() => console.log("Mes trajets effectués")}
          type="button"
        />
      </Box>
    </>
  );
}
