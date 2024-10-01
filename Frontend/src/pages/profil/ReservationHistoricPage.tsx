import { Container } from "@mui/material";

import PassengerHistoricContainer from "../../components/global/PassengerHistoricContainer";
export default function ReservationHistoricPage() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height:"100vh",
        mt:"4rem",
        backgroundColor: "#F4F4F4",
        display: "flex",
        justifyContent: "center",
        overflow:"auto"
      }}
    >
      <PassengerHistoricContainer />
    </Container>
  );
}
