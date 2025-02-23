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
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import  {fr}  from "date-fns/locale";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISearchTrajet } from "../../interfaces/services/ISearchTrajet";
import { formatDate } from "../../services/common/ConversionValue";
import { searchTrajet } from "../../services/trajet/trajetService";
import SearchJourneyBtn from "../buttons/SearchJourneyBtn";

export default function SearchFormHome() {
  const navigate = useNavigate();
  const [departureCity, setDepartureCity] = useState<string>("");
  const [arrivalCity, setArrivalCity] = useState<string>("");
  const [travelDate, setTravelDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState<number>(1);

  // État pour stocker les résultats de la recherche

  // Fonction appelée lors de la recherche
  const handleSearch = async () => {
    // Validation des paramètres avant la recherche

    if (!departureCity || !arrivalCity || !travelDate) {
      console.error("Veuillez remplir tous les champs");
      return;
    }

    // Création de l'objet de recherche
    const params: ISearchTrajet = {
      departureCity,
      arrivalCity,
      travelDate: formatDate(travelDate),
      // passengers,
    };

    try {
      // Appel de la fonction de recherche
      const results = await searchTrajet(params);

      navigate("/trajet/resultats", {
        state: { results },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        height: { xs: "45vh", sm: "45vh" },
        width: "20rem",
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
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
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
              value={arrivalCity}
              onChange={(e) => setArrivalCity(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              height: "15%",
              width: "85%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CalendarMonthRoundedIcon
              sx={{
                color: "#321F47",
              }}
            />
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={fr}
            >
              <DatePicker
                disablePast
                reduceAnimations={true}

                sx={{
                  fontWeight: 400,
                  height: "100%",
                  borderRadius: 0,
                  border: "none",

                  width: "85%",
                  "&.MuiDateCalendar-root": { fontFamily: "Montserrat" },
                  "& .MuiOutlinedInput-root": {
                    height: "100%",
                    borderColor: "#321F47",
                    borderBottom: "1px solid",
                    borderRadius: 0,
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    p: 0,
                    "& fieldset": {
                      borderColor: "#321F47",
                      border: "none",
                    },
                    "&:hover fieldset": {
                      borderColor: "#321F47",
                    },
                  },
                  "&.MuiInputBase-root .MuiOutlinedInput-root": {
                    border: "none",
                  },
                }}
                value={travelDate}
                onChange={(newDate) => setTravelDate(newDate)}
              />
            </LocalizationProvider>
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
                    color: "#321F47",
                  },
                  "& .MuiInputBase-root.MuiInput-root.MuiInput-underline :before":
                    {
                      borderBottomColor: "#321F47",
                    },
                  fontFamily: "Montserrat",
                }}
              >
                Passager
              </InputLabel>
              <Select
                variant="standard"
                label="Passagers"
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                sx={{
                  width: "100%",

                  "&:before": {
                    borderBottomColor: "#321F47",
                  },
                  "&:after": {
                    borderBottomColor: "#321F47",
                  },
                  "& .MuiSelect-select": {
                    color: "#321F47",
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
        <SearchJourneyBtn onClick={handleSearch} onClose={() => ""} />
      </Paper>
    </Box>
  );
}
