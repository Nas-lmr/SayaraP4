import { Box, Typography } from "@mui/material";
import SearchPageBtn from "../buttons/SearchPageBtn";
import { useNavigate } from "react-router-dom";

export default function InfoProfilNotLogged() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        pt: "1rem",
      }}
    >
      <Typography
        variant="h1"
        textAlign="center"
        sx={{
          color: "#321F47",
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: "1.5rem",
          width: "90%",
        }}
      >
        Pour accéder à ton profil tu dois te connecter ou bien créer un compte!
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "70%",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            height: "20%",
            width: "20rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#321F47",
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: "1.25rem",
              width: "90%",
            }}
          >
            Tu as déja un compte ?
          </Typography>
          <SearchPageBtn
            label="Je me connecte"
            onclick={() => navigate("/login")}
            type="button"
          />
        </Box>
        <Box
          sx={{
            height: "20%",
            width: "20rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#321F47",
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: "1.25rem",
              width: "90%",
            }}
          >
            Tu n'as pas de compte ?
          </Typography>
          <SearchPageBtn
            label="Je m'inscris"
            onclick={() => navigate("/register")}
            type="button"
          />
        </Box>
      </Box>
    </Box>
  );
}
