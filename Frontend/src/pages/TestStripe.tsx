import { Container } from "@mui/material";
import StripeWrapper from "../components/Stripewarpper";

export default function TestStripe() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        pt: "4rem",
        pb: "3rem",
        backgroundColor: "#F4F4F4",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <StripeWrapper amount={100} />
    </Container>
  );
}
