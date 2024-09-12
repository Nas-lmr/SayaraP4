import AddIcon from "@mui/icons-material/Add";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateJourneyBtn from "../buttons/CreateTripBtn";

const FormTrip: React.FC = () => {
  const [price, setPrice] = useState(0);
  const [villeDepart, setVilleDepart] = useState("");
  const [villeArrive, setVilleArrive] = useState("");
  const [passager, setPassager] = useState(1);
  const [dateDepart, setDateDepart] = useState<Date | null>(null);
  const [heureDisponible, setHeureDisponible] = useState<Date | null>(null);
  const navigate = useNavigate();
  const handlePlusPrice = () => {
    setPrice(price + 1);
  };
  const handleMinusPrice = () => {
    if (price > 0) {
      setPrice(price - 1);
    }
  };

  const handleSubmit = () => {
    if (villeDepart && villeArrive && dateDepart && heureDisponible) {
      const date = dateDepart.toLocaleDateString("fr-FR");

      // Extraire l'heure au format HH:MM
      const time = `${heureDisponible
        .getHours()
        .toString()
        .padStart(2, "0")} h ${heureDisponible
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      navigate("/trajet/nouveau-trajet/itineraire", {
        state: { villeDepart, villeArrive, date, time, price, passager },
      });
    }
  };

  return (
    <Paper
      component="form"
      elevation={3}
      sx={{
        height: "90%",
        width: "80%",
        backgroundColor: "rgba(255,255,255,65%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "1rem",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "1.8rem",
          fontFamily: "Montserrat",
          fontWeight: 600,
          marginTop: "2rem",
        }}
      >
        Crées ton trajet :
      </Typography>
      <Box
        sx={{
          height: "85%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center ",
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
              width: "100%",
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

              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
            variant="outlined"
            label="Ville de départ"
            value={villeDepart}
            onChange={(e) => setVilleDepart(e.target.value)}
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
              width: "100%",
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
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
            variant="outlined"
            label="Ville d'arrivée"
            value={villeArrive}
            onChange={(e) => setVilleArrive(e.target.value)}
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              sx={{
                width: "100%",
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
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
              label="Date de départ"
              value={dateDepart}
              onChange={(newValue) => setDateDepart(newValue)}
            />
          </LocalizationProvider>
        </Box>
        <Box
          sx={{
            height: "15%",
            width: "90%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Heure de départ"
              ampm={false}
              value={heureDisponible}
              onChange={(newHour) => setHeureDisponible(newHour)}
            />
          </LocalizationProvider>
          <PersonRoundedIcon
            sx={{
              width: "15%",
              height: "50%",
              mb: "0.3rem",
              color: "#321F47",
            }}
          />
          <FormControl variant="outlined" sx={{ width: "50%  " }}>
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
              Place disponible
            </InputLabel>

            <Select
              onChange={(e) => setPassager(e.target.value as number)}
              variant="outlined"
              label="Passagers"
              value={passager}
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
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
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
              color: "#321F47",
            }}
          />
          <TextField
            sx={{
              width: "100%",
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

              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
            variant="outlined"
            label="Point de Rendez vous"
          />
        </Box>
        <Box
          sx={{
            fontSize: "52px",
            color: "321F47",
            fontWeight: "bold",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: "1.5rem",
              fontFamily: "Montserrat",
              fontWeight: 600,
              marginTop: "2rem",
            }}
          >
            Choisis ton prix !
          </Typography>
          <Button
            onClick={handleMinusPrice}
            sx={{
              backgroundColor: "#321F47",
              borderRadius: "50%",
              width: "20px",
              height: "50px",
              color: "#FDC55E",
            }}
          >
            <RemoveIcon />{" "}
          </Button>{" "}
          {price}{" "}
          <EuroRoundedIcon
            sx={{
              fontSize: "40px",
              color: "321F47",
              fontWeight: "bold",
              margin: "0",
            }}
          />
          <Button
            onClick={handlePlusPrice}
            sx={{
              backgroundColor: "#321F47",
              borderRadius: "50%",
              width: "20px",
              height: "50px",
              color: "#FDC55E",
            }}
          >
            <AddIcon />{" "}
          </Button>
        </Box>
      </Box>
      <CreateJourneyBtn onClick={handleSubmit} />
    </Paper>
  );
};

export default FormTrip;
