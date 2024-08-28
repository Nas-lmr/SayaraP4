import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import { Box, Paper, TextField } from "@mui/material";
import SearchJourneyBtn from "../buttons/SearchJourneyBtn";

export default function SearchForm() {
  return (
    <Box sx={{ height: "40vh", width: "80vw", zIndex: 1 }}>
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          backgroundColor: "rgba(255,255,255,45%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "1rem",
        }}
      >
        <Box
          sx={{
            height: "85%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center ",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            sx={{
              height: "15%",
              width: "90%",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <PinDropRoundedIcon
              sx={{
                width: "15%",
                height: "50%",
                mb: "0.3rem",
                color: "#321F47",
              }}
            />
            <TextField
              sx={{
                width: "80%",
                "&.MuiFormLabel-root": { color: "#321F47" },
              }}
              variant="standard"
              label="Ville de départ"
            />
          </Box>
          <Box
            sx={{
              height: "15%",
              width: "90%",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <FlagRoundedIcon
              sx={{
                width: "15%",
                height: "50%",
                mb: "0.3rem",
                color: "#321F47",
              }}
            />
            <TextField
              sx={{
                width: "80%",
                color: "#321F47",
              }}
              variant="standard"
              label="Ville d'arrivée"
            />
          </Box>
          <Box
            sx={{
              height: "15%",
              width: "90%",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <CalendarMonthRoundedIcon
              sx={{
                width: "15%",
                height: "50%",
                mb: "0.3rem",
                color: "#321F47",
              }}
            />
            <TextField
              sx={{
                width: "80%",
                color: "#321F47",
              }}
              variant="standard"
              label="Date"
            />
          </Box>
          <Box
            sx={{
              height: "15%",
              width: "90%",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <PersonRoundedIcon
              sx={{
                width: "15%",
                height: "50%",
                mb: "0.3rem",
                color: "#321F47",
              }}
            />
            <TextField
              sx={{
                width: "80%",
                color: "#321F47",
              }}
              variant="standard"
              label="Passager/s"
            />
          </Box>
        </Box>
        <SearchJourneyBtn />
      </Paper>
    </Box>
  );
}
