import { Container } from "@mui/material";
import ReservationContainer from "../../components/trajet/ReservationContainer";
export default function ReservationPage() {
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
      <ReservationContainer />
    </Container>
  );
}
