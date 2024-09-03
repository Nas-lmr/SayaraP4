import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import SearchJourneyBtn from "../buttons/SearchJourneyBtn";

export default function SearchForm({ onClose }: { onClose: () => void }) {
  return (
    <Box
      sx={{
        height: { xs: "45vh", sm: "45vh" },
        width: { xs: "80vw", sm: "50vw" },
        maxWidth: { xs: "80vw", sm: "50vw" },
        zIndex: 1,
        position: "relative",
        bottom: "-1.5rem",
        display: { xs: "block", md: "none" },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          backgroundColor: "rgba(255,255,255,65%)",
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
                "& .MuiInput-underline:before": {
                  borderBottomColor: "#321F47",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#321F47",
                },
                "& .MuiInputLabel-root": {
                  color: "#321F47",
                  fontFamily: "Montserrat",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#321F47",
                },
                fontFamily: "Montserrat",
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
                "& .MuiInput-underline:before": {
                  borderBottomColor: "#321F47",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#321F47",
                },
                "& .MuiInputLabel-root": {
                  color: "#321F47",
                  fontFamily: "Montserrat",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#321F47",
                },
                fontFamily: "Montserrat",
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
                "& .MuiInput-underline:before": {
                  borderBottomColor: "#321F47",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#321F47",
                },
                "& .MuiInputLabel-root": {
                  color: "#321F47",
                  fontFamily: "Montserrat",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#321F47",
                },
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

            <FormControl variant="standard" sx={{ width: "80%" }}>
              <InputLabel
                sx={{
                  color: "#321F47",
                  "&.Mui-focused": {
                    color: "#321F47", // Couleur du label lorsque le champ est focalisé
                  },
                  "& .MuiInputBase-root.MuiInput-root.MuiInput-underline :before":
                    {
                      borderBottomColor: "#321F47", // Couleur de la bordure inférieure avant le focus
                    },
                  fontFamily: "Montserrat",
                }}
              >
                Passager
              </InputLabel>
              <Select
                variant="standard"
                label="Passagers"
                sx={{
                  width: "100%",

                  "&:before": {
                    borderBottomColor: "#321F47", // Couleur de la bordure inférieure avant le focus
                  },
                  "&:after": {
                    borderBottomColor: "#321F47", // Couleur de la bordure inférieure après le focus
                  },
                  "& .MuiSelect-select": {
                    color: "#321F47", // Couleur de la valeur sélectionnée
                  },
                }}
              >
                <MenuItem>---</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <SearchJourneyBtn onClose={onClose} />
      </Paper>
    </Box>
  );
}
