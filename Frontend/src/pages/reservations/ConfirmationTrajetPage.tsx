import { Container } from "@mui/material";
import RecapTrajetCreation from "../../components/trajet/RecapTrajetCreation";

export default function ConfirmationTrajetPage() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        pt: "4rem",
        pb: { xs: "3rem", md: 0 },
        backgroundColor: "#F4F4F4",
      }}
    >
      <RecapTrajetCreation />
    </Container>
  );
}
