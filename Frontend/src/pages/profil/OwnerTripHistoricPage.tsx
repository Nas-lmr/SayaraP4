import { Container } from "@mui/material";
import OwnerTripContainer from "../../components/global/OwnerTripContainer";

export default function OwnerTripHistoricPage() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        mt: "4rem",
        backgroundColor: "#F4F4F4",
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <OwnerTripContainer />
    </Container>
  );
}
