import { Box, Typography } from "@mui/material";
import euroIcon from "/src/assets/icons/fi-br-euro.svg";
import thumbsUpIcon from "/src/assets/icons/fi-br-thumbs-up.svg";
import leafIcon from "/src/assets/icons/fi-br-leaf.svg";

export default function ObjectiveInfo() {
  return (
    <Box
      sx={{
        pt: "3.5rem",
        pl: { xs: "1rem", md: "2rem" },
        pr: "1rem",
        pb: "5rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <Typography
        textAlign="center"
        variant="h2"
        sx={{
          fontSize: { xs: "1.3rem", sm: "1.9rem", md: "2.2rem" },
          fontFamily: "Montserrat",
          fontWeight: 600,
          color: "#321F47",
          pt: { md: "3.5rem" },
        }}
      >
        Pourquoi choisir SAYARA ?
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          gap: { xs: "2rem", md: "3rem" },
          pt: { xs: "2rem", md: "3rem" },
          justifyContent: { md: "center" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { md: "45%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={euroIcon}
              alt="Icone du sigle euro"
              sx={{ height: { xs: 15, sm: 17, md: 25 } }}
            />
            <Typography
              variant="h3"
              sx={{
                fontSize: {
                  xs: "1.15rem",
                  sm: "1.5rem",
                },
                pl: "0.3rem",
                fontFamily: "Montserrat",
                fontWeight: 500,
                color: "#321F47",
              }}
            >
              Économisez en toute simplicité
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              pt: "0.5rem",
              pl: "1.5rem",
              fontFamily: "Montserrat",
              fontWeight: 400,
              color: "#321F47",
              width: { sm: "85%", md: "100%" },
              textJustify: "auto",
            }}
          >
            Réduisez vos frais de transport en partageant vos trajets avec
            d'autres passagers. Moins de dépenses pour plus de confort, c'est un
            choix malin pour votre portefeuille.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { md: "45%" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={thumbsUpIcon}
              alt="Icone d'un pouce en l'air"
              sx={{ height: { xs: 15, sm: 17, md: 25 } }}
            />
            <Typography
              variant="h3"
              sx={{
                fontSize: {
                  xs: "1.15rem",
                  sm: "1.5rem",
                },
                pl: "0.3rem",
                fontFamily: "Montserrat",
                fontWeight: 500,
                color: "#321F47",
              }}
            >
              Voyagez en toute sécurité
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              pt: "0.5rem",
              pl: "1.5rem",
              fontFamily: "Montserrat",
              fontWeight: 400,
              color: "#321F47",
              width: { sm: "85%", md: "100%" },
              textJustify: "auto",
            }}
          >
            Sayara sélectionne des conducteurs <b>fiables</b> et <b>vérifiés</b>
            , vous assurant des trajets en toute sérénité. Vous rejoignez votre
            destination en toute confiance, sans souci.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { md: "45%" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={leafIcon}
              alt="Icone d'une feuille"
              sx={{ height: { xs: 15, sm: 17, md: 25 } }}
            />
            <Typography
              variant="h3"
              sx={{
                fontSize: {
                  xs: "1.15rem",
                  sm: "1.5rem",
                },
                pl: "0.3rem",
                fontFamily: "Montserrat",
                fontWeight: 500,
                color: "#321F47",
              }}
            >
              Contribuez à un avenir durable
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              pt: "0.5rem",
              pl: "1.5rem",
              fontFamily: "Montserrat",
              fontWeight: 400,
              color: "#321F47",
              width: { sm: "85%", md: "100%" },
              textJustify: "auto",
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
