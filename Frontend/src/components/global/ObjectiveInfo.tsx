import { Box, Typography } from "@mui/material";

export default function ObjectiveInfo() {
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <Box sx={{ pt: "3.5rem", pl: "1rem", pr: "1rem", pb: "5rem" }}>
        <Typography
          textAlign="center"
          variant="h2"
          sx={{
            fontSize: "1.3rem",
            fontFamily: "Montserrat",
            fontWeight: 600,
            color: "#321F47",
          }}
        >
          Pourquoi choisir SAYARA ?
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", pt: "2rem" }}>
          <Box
            component="img"
            src="../src/assets/icons/fi-br-euro.svg"
            alt="Icone du sigle euro"
            sx={{ height: 15 }}
          />
          <Typography
            variant="h3"
            sx={{
              fontSize: "1.15rem",
              pl: "0.3rem",
              fontFamily: "Montserrat",
              fontWeight: 500,
              color: "#321F47",
            }}
          >
            Économisez en toute simplicité
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontSize: "0.85rem",
              pt: "0.5rem",
              pl: "1.5rem",
              fontFamily: "Montserrat",
              fontWeight: 400,
              color: "#321F47",
            }}
          >
            Réduisez vos frais de transport en partageant vos trajets avec
            d'autres passagers. Moins de dépenses pour plus de confort, c'est un
            choix malin pour votre portefeuille.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", pt: "2rem" }}>
          <Box
            component="img"
            src="../src/assets/icons/fi-br-thumbs-up.svg"
            alt="Icone d'un pouce en l'air"
            sx={{ height: 15 }}
          />
          <Typography
            variant="h3"
            sx={{
              fontSize: "1.15rem",
              pl: "0.3rem",
              fontFamily: "Montserrat",
              fontWeight: 500,
              color: "#321F47",
            }}
          >
            Voyagez en toute sécurité
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontSize: "0.85rem",
              pt: "0.5rem",
              pl: "1.5rem",
              fontFamily: "Montserrat",
              fontWeight: 400,
              color: "#321F47",
            }}
          >
            Sayara sélectionne des conducteurs <b>fiables</b> et <b>vérifiés</b>
            , vous assurant des trajets en toute sérénité. Vous rejoignez votre
            destination en toute confiance, sans souci.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", pt: "2rem" }}>
          <Box
            component="img"
            src="../src/assets/icons/fi-br-leaf.svg"
            alt="Icone d'une feuille"
            sx={{ height: 15 }}
          />
          <Typography
            variant="h3"
            sx={{
              fontSize: "1.15rem",
              pl: "0.3rem",
              fontFamily: "Montserrat",
              fontWeight: 500,
              color: "#321F47",
            }}
          >
            Contribuez à un avenir durable
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontSize: "0.85rem",
              pt: "0.5rem",
              pl: "1.5rem",
              fontFamily: "Montserrat",
              fontWeight: 400,
              color: "#321F47",
            }}
          >
            En choisissant le covoiturage, vous faites bien plus que partager un
            trajet : vous participez à la réduction des émissions de CO2 et à la
            décongestion des routes.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
