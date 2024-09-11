import { Box, Typography } from "@mui/material";
import Searchbar from "./Searchbar";
import SearchbarDesktop from "./SearchbarDesktop";

export default function TopSearchCpnt() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "20vh",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
        pt: { md: "1rem" },
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "1.8rem", fontFamily: "Montserrat", fontWeight: 600 }}
      >
        Trouves ton trajet idéal !
      </Typography>
      <SearchbarDesktop />
      <Searchbar />
    </Box>
  );
}
