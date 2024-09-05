import { Container } from "@mui/material";
import InfoProfilNotLogged from "../components/global/InfoProfilNotLogged";
import ProfilSection from "../components/global/ProfilSection";
import { useUserContext } from "../context/UserContext";

export default function ProfilPage() {
  const { userData } = useUserContext();
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
      {userData === null ? (
        <InfoProfilNotLogged
          text=" Pour accéder à ton profil tu dois te connecter ou bien crées un compte!"
          image="../src/assets/images/ProfilImg.png"
          alt="Homme souriant"
        />
      ) : (
        <ProfilSection />
      )}
    </Container>
  );
}
