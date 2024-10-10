import { Container, Typography } from "@mui/material";
import InfoProfilNotLogged from "../components/global/InfoProfilNotLogged";
import { TchatErrorComponent } from "../components/chat/TchatErrorComponent";
import { useRoom } from "../hooks/messages/useRoom";
import { PageMessageComponent } from "../components/chat/PageMessageComponent";
import Img from "../assets/images/MsgImg.png";

export default function TchatPage() {
  const { userData, error } = useRoom();

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        pt: "6rem",
        pb: "3rem",
        backgroundColor: "#F4F4F4",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {userData === null ? (
        <InfoProfilNotLogged
          text=" Pour voir tes messages tu dois te connecter ou bien crées un compte!"
          image={Img}
          alt="Homme écrivant un message"
        />
      ) : (
        <>
          {error && <TchatErrorComponent error={error} />}
          {!error ? (
            <PageMessageComponent />
          ) : (
            <Typography variant="h6">Pas de room sélectionner</Typography>
          )}
        </>
      )}
    </Container>
  );
}
