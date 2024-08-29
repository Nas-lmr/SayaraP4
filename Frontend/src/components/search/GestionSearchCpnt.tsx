import { Box } from "@mui/material";
import JourneyGestion from "./JourneyGestion";
import ReservationGestion from "./ReservationGestion";

export default function GestionSearchCpnt() {
  return (
    <Box
      sx={{
        pt: "1.5rem",
        height: "55%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <ReservationGestion />
      <JourneyGestion />
    </Box>
  );
}
