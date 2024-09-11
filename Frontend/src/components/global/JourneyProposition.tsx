import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import { Box, Typography } from "@mui/material";
import PropositionCard from "../cards/PropositionCard";

export default function JourneyProposition() {
  const trajets: [string, string][] = [
    ["Paris", "Marseille"],
    ["Lyon", "Toulouse"],
    ["Nice", "Nantes"],
  ];

  return (
    <Box sx={{ height: "10rem", pt: { md: "2rem" } }}>
      <Box
        sx={{
          width: "55%",
          display: "flex",
          alignItems: "center",
          pl: { xs: "1rem", sm: "2rem", md: "5rem", lg: "6rem" },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Montserrat",
            color: "#321F47",
            fontSize: { xs: "1rem", sm: "1.3rem" },
            fontWeight: 500,
          }}
        >
          Les plus recherchés
        </Typography>
        <WhatshotRoundedIcon sx={{ color: "#FF4500", pl: "0.2rem" }} />
      </Box>
      <Box
        sx={{
          pt: "1rem",
          pl: "1rem",
          height: "100%",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        {trajets.map((trajet, index) => (
          <PropositionCard
            key={index}
            villeDepart={trajet[0]}
            villeArrivee={trajet[1]}
          />
        ))}
      </Box>
    </Box>
  );
}
