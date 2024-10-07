import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IInfoNotLogged } from "../../interfaces/components/IInfoNotLogged";
import SearchPageBtn from "../buttons/SearchPageBtn";

export default function InfoProfilNotLogged({
  text,
  image,
  alt,
}: IInfoNotLogged) {
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "60%",
          justifyContent: "space-around",
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
          {text}
        </Typography>
        <Box
          component="img"
          src={image}
          alt={alt}
          sx={{
            height: { xs: "70%", sm: "60%", md: "70%", lg: "80%" },
            width: { xs: "80%", sm: "50%", md: "40%", lg: "30%" },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "40%",
          gap: "2rem",
        }}
      >
        <Box
          sx={{
            height: "30%",
            width: "20rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
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
            height: "30%",
            width: "20rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
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
