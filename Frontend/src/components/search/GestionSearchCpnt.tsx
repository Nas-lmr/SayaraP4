import { Box } from "@mui/material";
import JourneyGestion from "./JourneyGestion";
import ReservationGestion from "./ReservationGestion";

export default function GestionSearchCpnt() {
  return (
    <Box
      sx={{
        pt: "1.5rem",
        pb: "5rem",
        display: "flex",
        justifyContent: "center",
        flexDirection: { xs: "column", sm: "row" },
        width: "100%",
      }}
    >
      <ReservationGestion />
      <JourneyGestion />
    </Box>
  );
}
