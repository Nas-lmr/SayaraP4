import { Container } from "@mui/material";
import InfoProfilNotLogged from "../components/global/InfoProfilNotLogged";

export default function ProfilPage() {
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
      <InfoProfilNotLogged />
    </Container>
  );
}
