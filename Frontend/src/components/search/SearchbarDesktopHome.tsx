// import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import { Box, OutlinedInput } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import enUs  from "date-fns/locale/en-US";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISearchTrajet } from "../../interfaces/services/ISearchTrajet";
import { formatDate } from "../../services/common/ConversionValue";
import { searchTrajet } from "../../services/trajet/trajetService";
import SearchDesktopBtn from "../buttons/SearchDesktopBtn";
import PassengerSearchbar from "./PassengerSearchbar";

export default function SearchbarDesktopHome() {
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
      console.log("RESULT:", results, "PARAMS:", params);

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
        width: "85%",
        height: "4rem",
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <OutlinedInput
        value={departureCity}
        onChange={(e) => setDepartureCity(e.target.value)}
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
          fontWeight: 500,
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
        value={arrivalCity}
        onChange={(e) => setArrivalCity(e.target.value)}
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
          fontWeight: 500,
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUs}>
        <DesktopDatePicker
          disablePast
          sx={{
            fontWeight: 400,
            height: "100%",
            borderRadius: 0,
            borderTop: "1px solid",
            borderBottom: "1px solid",
            borderColor: "rgba(50, 31, 71, 0.5)",
            "&.MuiDateCalendar-root": { fontFamily: "Montserrat" },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
              height: "100%",
              borderRadius: 0,
              fontFamily: "Montserrat",
              fontWeight: 500,
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
              "& fieldset": {
                borderColor: "#321F47",
                border: "none",
              },
              "&:hover fieldset": {
                borderColor: "#321F47",
              },
            },
            "&.MuiInputBase-root .MuiOutlinedInput-root": { border: "none" },
          }}
          value={travelDate}
          onChange={(newValue) => setTravelDate(newValue)}
        />
      </LocalizationProvider>
      <PassengerSearchbar passenger={passengers} setPassenger={setPassengers} />
      <SearchDesktopBtn onClick={handleSearch} onClose={() => ""} />
    </Box>
  );
}
