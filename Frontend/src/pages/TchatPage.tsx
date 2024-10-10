import { Container } from "@mui/material";
import Img from "../assets/images/MsgImg.png";
import InfoProfilNotLogged from "../components/global/InfoProfilNotLogged";
import { useRoom } from "../hooks/messages/useRoom";

export default function TchatPage() {
  const { userData } = useRoom();

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
          <h1> en cours de contruction </h1>
          {/* {error && <TchatErrorComponent error={error} />}
              {!error ? (<PageMessageComponent />) : (<Typography variant="h6">Pas de room sélectionner</Typography>)} */}
        </>
      )}
    </Container>
  );
}
