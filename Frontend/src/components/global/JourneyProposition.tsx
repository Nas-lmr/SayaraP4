import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import { Box, Typography } from "@mui/material";
import PropositionCard from "./PropositionCard";

export default function JourneyProposition() {
  const trajets: [string, string][] = [
    ["Paris", "Marseille"],
    ["Lyon", "Toulouse"],
    ["Nice", "Nantes"],
  ];

  return (
    <Box sx={{ height: "20vh", pt: "1.5rem" }}>
      <Box sx={{ width: "55%", display: "flex", pl: "1rem" }}>
        <Typography
          sx={{
            fontFamily: "Montserrat",
            color: "#321F47",
            fontSize: "1rem",
            fontWeight: 500,
          }}
        >
          Les plus recherchés
        </Typography>
        <WhatshotRoundedIcon
          fontSize="small"
          sx={{ color: "#FF4500", pl: "0.2rem" }}
        />
      </Box>
      <Box
        sx={{
          pt: "0.5rem",
          height: "70%",
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
