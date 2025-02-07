import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Avatar from "../../assets/images/Avatar.png";
import { useUserContext } from "../../context/UserContext";
import ProfilBtn from "../buttons/ProfilBtn";

export default function ProfilSection() {
  const { userData } = useUserContext();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        pb: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          height: "40%",
        }}
      >
        <Typography
          variant="h1"
          textAlign="center"
          sx={{
            color: "#321F47",
            fontFamily: "Montserrat",
            fontWeight: 500,
            fontSize: "1.7rem",
            width: "90%",
          }}
        >
          Mon profil
        </Typography>
        <Box
          component="img"
          src={Avatar}
          alt="Image du profil"
          sx={{ height: "10rem", width: "10rem" }}
        />
        <Typography
          variant="h2"
          textAlign="center"
          sx={{
            color: "#321F47",
            fontFamily: "Montserrat",
            fontWeight: 500,
            fontSize: "1.5rem",
            width: "90%",
          }}
        >
          {userData?.user?.username}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "90%",
          height: "40%",
        }}
      >
        <NavLink
          to="/profil/mon-profil/mes-informations"
          style={{ textDecoration: "none" }}
        >
          <ProfilBtn
            label="Mes informations"
            onclick={() => console.log("salut")}
          />
        </NavLink>

        <NavLink
          to="/trajet/reservation/historique"
          style={{ textDecoration: "none" }}
        >
          <ProfilBtn
            label="Historique des réservations"
            onclick={() => console.info("salut")}
          />
        </NavLink>
        <NavLink to="/trajet/mes-trajets" style={{ textDecoration: "none" }}>
          <ProfilBtn
            label="Historique des trajets"
            onclick={() => console.info("salut")}
          />
        </NavLink>
      </Box>
    </Box>
  );
}
