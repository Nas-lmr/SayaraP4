import { Container } from "@mui/material";
import JourneyProposition from "../components/global/JourneyProposition";
import GestionSearchCpnt from "../components/search/GestionSearchCpnt";
import TopSearchCpnt from "../components/search/TopSearchCpnt";

export default function BookingPage() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        pt: "4rem",
        pb: "4rem",
        backgroundColor: "#F4F4F4",
      }}
    >
      <TopSearchCpnt />
      <JourneyProposition />
      <GestionSearchCpnt />
    </Container>
  );
}
