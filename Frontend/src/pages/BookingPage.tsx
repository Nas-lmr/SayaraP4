import { Container } from "@mui/material";
import JourneyProposition from "../components/global/JourneyProposition";
import GestionSearchCpnt from "../components/search/GestionSearchCpnt";
import Searchbar from "../components/search/Searchbar";

export default function BookingPage() {
  return (
    <Container
      disableGutters
      sx={{
        height: "100vh",
        pt: "4rem",
        pb: "3.5rem",
        backgroundColor: "#F4F4F4",
      }}
    >
      <Searchbar />
      <JourneyProposition />
      <GestionSearchCpnt />
    </Container>
  );
}
