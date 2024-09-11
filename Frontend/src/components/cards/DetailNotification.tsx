import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Box, Typography } from "@mui/material";

export default function DetailNotification() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        p: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontSize: "0.8rem",
            fontFamily: "Montserrat",
            fontWeight: 500,
            color: "#321F47",
          }}
        >
          Départ: 06/09/2024 à 15h30
        </Typography>
        <Typography
          alignContent="center"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            fontSize: "0.8rem",
            fontFamily: "Montserrat",
            fontWeight: 500,
            color: "#321F47",
            width: "23%",
          }}
        >
          Pour: 2{" "}
          <PersonRoundedIcon
            sx={{
              fontSize: "1rem",
              color: "#321F47",
            }}
          />
        </Typography>
      </Box>
      <Box sx={{ width: "100%", display: "flex" }}>
        <Typography
          sx={{
            width: "fit-content",
            pr: "0.5rem",
            fontSize: "0.8rem",
            fontFamily: "Montserrat",
            fontWeight: 500,
            color: "#321F47",
          }}
        >
          Paris
        </Typography>
        <ArrowRightAltRoundedIcon
          sx={{
            fontSize: "1.5rem",
            color: "#321F47",
          }}
        />
        <Typography
          sx={{
            width: "30%",
            pl: "0.5rem",
            fontSize: "0.8rem",
            fontFamily: "Montserrat",
            fontWeight: 500,
            color: "#321F47",
          }}
        >
          Marseille
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: "0.8rem",
          fontFamily: "Montserrat",
          fontWeight: 500,
          color: "#321F47",
        }}
      >
        Lieu du rdv : Pl. Louis Armand, 75012 Paris{" "}
      </Typography>
    </Box>
  );
}
