import { Box, Typography } from "@mui/material";
import BgImage from "../../assets/images/covoiturage.png";
import SearchForm from "../search/SearchForm";

export default function HeroSection() {
  return (
    <Box
      sx={{
        height: "55vh",
        background: `url(${BgImage})`,
        backgroundPosition: "center",
        backgroundSize: { xs: "110%", sm: "90%" },
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Typography
        textAlign="center"
        variant="h1"
        sx={{
          fontSize: "1.5rem",
          pt: "1.5rem",
          pl: "0.8rem",
          pr: "0.8rem",
          lineHeight: 1.5,
          color: "#321F47",
        }}
      >
        <span style={{ fontSize: "1.25rem", fontWeight: 400 }}>
          Avec SAYARA,
        </span>
        <br />
        <span style={{ fontSize: "1.3rem", fontWeight: 500 }}>
          économises et pars sans tracas !
        </span>
      </Typography>
      <SearchForm />
    </Box>
  );
}
