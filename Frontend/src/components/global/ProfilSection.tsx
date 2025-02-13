import { Box, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "../../assets/images/Avatar.png";
import { useUserContext } from "../../context/UserContext";
import ProfilBtn from "../buttons/ProfilBtn";

export default function ProfilSection() {
  const { userData, logout } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (userData) {
      try {
        await logout();

        navigate("/");
      } catch (error) {
        console.error("Erreur de déconnexion:", error);
      }
    }
  };

  return (
    <>
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
            to="/trajet/reservation/historique"
            style={{ textDecoration: "none" }}
          >
            <ProfilBtn
              label="Historique des réservations"
              onclick={() => navigate("/trajet/reservation/historique")}
            />
          </NavLink>
          <NavLink to="/trajet/mes-trajets" style={{ textDecoration: "none" }}>
            <ProfilBtn
              label="Historique des trajets"
              onclick={() => navigate("/trajet/mes-trajets")}
            />
          </NavLink>

          <ProfilBtn label="Se déconnecter" onclick={handleLogout} />
        </Box>
      </Box>
    </>
  );
}
