import { Container } from "@mui/material";
import InfoProfilNotLogged from "../components/global/InfoProfilNotLogged";
import { useUserContext } from "../context/UserContext";

export default function NotificationPage() {
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
        <InfoProfilNotLogged text=" Pour voir tes notifications tu dois te connecter ou bien crées un compte!" />
      ) : (
        <h1>ARHHHAAAAAA</h1>
      )}
    </Container>
  );
}
