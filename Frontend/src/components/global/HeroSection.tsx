import { Box, Typography } from "@mui/material";
import BgImage from "../../assets/images/covoiturage.png";
import SearchForm from "../forms/SearchForm";
// import SearchbarDesktop from "../search/SearchbarDesktop";

export default function HeroSection() {
  return (
    <Box
      sx={{
        height: { xs: "55vh", md: "56vh", lg: "60vh" },
        background: `url(${BgImage})`,
        backgroundPosition: "center",
        backgroundSize: { xs: "105%", sm: "90%", md: "60%", lg: "40%" },
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: { xs: "space-around", md: "space-between" },
      }}
    >
      <Box>
        <Typography
          textAlign="center"
          variant="h1"
          sx={{
            fontSize: { xs: "1.4rem", sm: "1.5rem", md: "2rem" },
            pt: "1.5rem",
            pl: "0.8rem",
            pr: "0.8rem",
            lineHeight: 1.5,
            color: "#321F47",
            fontFamily: "Montserrat",
            fontWeight: 400,
          }}
        >
          Avec SAYARA,
        </Typography>
        <Typography
          textAlign="center"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 500,
            color: "#321F47",
            fontSize: { xs: "1.5rem", sm: "1.9rem", md: "2rem" },
          }}
        >
          économises et pars sans tracas !
        </Typography>
      </Box>
      {/* <SearchbarDesktop /> */}
      <SearchForm onClose={() => {}} />
    </Box>
  );
}
