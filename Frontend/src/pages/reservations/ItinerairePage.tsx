import { Container } from "@mui/material";
import ItineraireContainer from "../../components/map/ItineraireContainer";

export default function ItinerairePage() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        pt: "4rem",
        pb: "3rem",
        backgroundColor: "#F4F4F4",
      }}
    >
      <ItineraireContainer />
    </Container>
  );
}
