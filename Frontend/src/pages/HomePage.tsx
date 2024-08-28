import { Container } from "@mui/material";
import HeroSection from "../components/global/HeroSection";
import ObjectiveInfo from "../components/global/ObjectiveInfo";

export default function HomePage() {
  return (
    <Container
      disableGutters
      sx={{ height: "100vh", pt: "4rem", backgroundColor: "#F4F4F4" }}
    >
      <HeroSection />
      <ObjectiveInfo />
    </Container>
  );
}
