import { Container } from "@mui/material";
import NewJourneyBtn from "../components/buttons/NewJourneyBtn";
import HeroSection from "../components/global/HeroSection";
import ObjectiveInfo from "../components/global/ObjectiveInfo";

export default function HomePage() {
  return (
    <Container
      disableGutters
      sx={{
        height: "100%",
        pt: "4rem",
        pb: "3rem",
        backgroundColor: "#F4F4F4",
      }}
    >
      <HeroSection />
      <ObjectiveInfo />
      <NewJourneyBtn />
    </Container>
  );
}
