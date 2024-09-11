import { Container } from "@mui/material";
<<<<<<< HEAD
import FormTrip from "../../components/FormTrip";


export default function NewJourneyPage() {
  return (
    <Container
    disableGutters
    sx={{
      height: "100vh",
      pt: "4rem",
      pb: "3.5rem",
      backgroundColor: "#F4F4F4",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      
    }}
  >
  <FormTrip/>
  </Container>
  )
=======
import InfoProfilNotLogged from "../../components/global/InfoProfilNotLogged";
import { useUserContext } from "../../context/UserContext";

export default function NewJourneyPage() {
  const { userData } = useUserContext();

  console.log("userData:", userData);

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
      {!userData ? (
        <InfoProfilNotLogged
          text=" Pour créer un trajet tu dois te connecter ou bien crées un compte!"
          image="../../src/assets/images/TrajetImg.png"
          alt="Homme réfléchisant à côté d'une voiture"
        />
      ) : (
        <h1>ARHHHAAAAAA</h1>
      )}
    </Container>
  );
>>>>>>> dev
}
