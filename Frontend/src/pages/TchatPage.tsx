import {Container} from "@mui/material";
// import InfoProfilNotLogged from "../components/global/InfoProfilNotLogged";
// import {TchatErrorComponent} from "../components/chat/TchatErrorComponent";
// import {PageMessageComponent} from "../components/chat/PageMessageComponent";

export default function TchatPage() {

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
        flexDirection: 'column'
      }}
    >
      {
        
            <>
             <h1> en cours de contruction </h1>
              {/* {error && <TchatErrorComponent error={error} />}
              {!error ? (<PageMessageComponent />) : (<Typography variant="h6">Pas de room sélectionner</Typography>)} */}
            </>
          
      }
    </Container>
  );
}
