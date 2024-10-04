import { Container } from "@mui/material";
import OwnerReservationHistoricContainer from "../../components/global/OwnerReservationHistoricContainer";

export default function OwnerTripReservationHistoricPage() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        pt: "4rem",
        backgroundColor: "#F4F4F4",
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <OwnerReservationHistoricContainer />
    </Container>
  );
}
