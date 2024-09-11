import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import { Box, Button, OutlinedInput } from "@mui/material";
import SearchDesktopBtn from "../buttons/SearchDesktopBtn";
import PassengerSearchbar from "./PassengerSearchbar";

export default function SearchbarDesktop() {
  return (
    <Box
      sx={{
        width: "85%",
        height: "4rem",
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <OutlinedInput
        placeholder="Ville de départ"
        startAdornment={<PinDropRoundedIcon sx={{ color: "#321F47" }} />}
        sx={{
          borderRadius: "1rem 0 0 1rem",
          backgroundColor: "white",
          width: "25%",
          height: "100%",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderLeft: "1px solid",
          borderColor: "rgba(50, 31, 71, 0.5)",
          borderRight: "none",
          fontFamily: "Montserrat",
          "& fieldset": {
            borderColor: "#321F47",
            border: "none",
          },
          "&:hover fieldset": {
            borderColor: "#321F47",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#321F47",
          },
        }}
      />

      <OutlinedInput
        placeholder="Ville d'arrivée"
        startAdornment={<FlagRoundedIcon sx={{ color: "#321F47" }} />}
        sx={{
          borderRadius: " 0",
          backgroundColor: "white",
          width: "25%",
          height: "100%",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "rgba(50, 31, 71, 0.5)",
          "& fieldset": {
            borderColor: "#321F47",
            border: "none",
          },
          "&:hover fieldset": {
            borderColor: "#321F47",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#321F47",
          },
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            left: "0",
            top: "20%",
            height: "60%",
            width: "1px",
            backgroundColor: "rgba(50, 31, 71, 0.5)",
          },
          fontFamily: "Montserrat",
        }}
      />
      <Button
        startIcon={<CalendarMonthRoundedIcon sx={{ color: "#321F47" }} />}
        sx={{
          borderRadius: " 0",
          backgroundColor: "white",
          width: "15%",
          height: "100%",
          display: "flex",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          justifyContent: "flex-start",
          borderColor: "rgba(50, 31, 71, 0.5)",
          fontFamily: "Montserrat",
          color: "#321F47",
          textTransform: "none",
          "&::before": {
            content: '""',
            position: "absolute",
            left: "0",
            top: "20%",
            height: "60%",
            width: "1px",
            backgroundColor: "rgba(50, 31, 71, 0.5)",
          },
        }}
      >
        Date
      </Button>
      <PassengerSearchbar />
      <SearchDesktopBtn />
    </Box>
  );
}
