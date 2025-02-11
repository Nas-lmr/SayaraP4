import { Container } from "@mui/material";
import FormTrip from "../../components/forms/FormTrip";
import InfoProfilNotLogged from "../../components/global/InfoProfilNotLogged";
import { useUserContext } from "../../context/UserContext";
import loop from "/src/assets/images/TrajetImg.png"
export default function NewJourneyPage() {
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
        alignItems: "center",
      }}
    >
      {!userData ? (
        <InfoProfilNotLogged
          text=" Pour créer un trajet tu dois te connecter ou bien crées un compte!"
          image={loop}
          alt="Homme réfléchisant à côté d'une voiture"
        />
      ) : (
        <FormTrip />
      )}
    </Container>
  );
}
