import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchPageBtn from "../buttons/SearchPageBtn";

export default function JourneyGestion() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { sm: "center" },
        justifyContent: { sm: "space-around" },
        width: { xs: "100%", sm: "50%", md: "50%", lg: "40%" },
      }}
    >
      <Typography
        textAlign="center"
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
          pt: "0.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { sm: "85%" },
          gap: "0.8rem",
        }}
      >
        <SearchPageBtn
          label="Nouveau trajet"
          onclick={() => navigate("/trajet/nouveau-trajet")}
          type="button"
        />
        <SearchPageBtn
          label="Mes trajets"
          onclick={() => navigate("/")}
          type="button"
        />
        <SearchPageBtn
          label="Mes trajets effectués"
          onclick={() => navigate("/")}
          type="button"
        />
      </Box>
    </Box>
  );
}
