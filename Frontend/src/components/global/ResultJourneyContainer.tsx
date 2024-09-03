import { Box } from "@mui/material";
import ResultJourneyCard from "../cards/ResultJourneyCard";

export default function ResultJourneyContainer() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        pt: "2rem",
      }}
    >
      <ResultJourneyCard />
      <ResultJourneyCard />
      <ResultJourneyCard />
    </Box>
  );
}
