import AddIcon from "@mui/icons-material/Add";
import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {enUS} from "date-fns/locale/en-US";
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
        state: {
          villeDepart,
          villeArrive,
          date,
          time,
          price,
          passager,
        },
      });
    }
  };

  return (
    <Paper
      component="form"
      elevation={3}
      sx={{
        height: "40rem",
        width: { xs: "20rem", md: "25rem" },
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
        Crées ton trajet
      </Typography>
      <Box
        sx={{
          height: "85%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center ",
          justifyContent: "space-around",
        }}
      >
        <OutlinedInput
          sx={{
            height: "3rem",
            width: "85%",
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
          placeholder="Ville de départ"
          startAdornment={<PinDropRoundedIcon sx={{ color: "#321F47" }} />}
          value={villeDepart}
          onChange={(e) => setVilleDepart(e.target.value)}
        />

        <OutlinedInput
          sx={{
            height: "3rem",
            width: "85%",
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
          placeholder="Ville d'arrivée"
          startAdornment={<FlagRoundedIcon sx={{ color: "#321F47" }} />}
          value={villeArrive}
          onChange={(e) => setVilleArrive(e.target.value)}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
          <DatePicker
            disablePast
            sx={{
              width: "85%",
              fontFamily: "Montserrat",
              fontWeight: 400,

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
              "& .MuiOutlinedInput-root": {
                height: "3rem",
                borderRadius: "10px",
              },
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
            value={dateDepart}
            onChange={(newValue) => setDateDepart(newValue)}
          />
        </LocalizationProvider>

        <Box
          sx={{
            width: "85%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Heure de départ"
              ampm={false}
              value={heureDisponible}
              onChange={(newHour) => setHeureDisponible(newHour)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "3rem",
                  borderRadius: "10px",
                },
                width: "60%",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />
          </LocalizationProvider>

          <Select
            startAdornment={
              <PersonRounded
                sx={{
                  color: "#321F47",
                }}
              />
            }
            onChange={(e) => setPassager(e.target.value as number)}
            variant="outlined"
            value={passager}
            sx={{
              width: "35%",
              height: "3rem",
              color: "#321F47",
              fontFamily: "Montserrat",
              fontWeight: 500,
              "& .MuiInputBase-root": {
                "&.focused": { borderColor: "#321F47" },
              },
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <MenuItem
              value={1}
              sx={{
                color: "#321F47",
                fontFamily: "Montserrat",
                fontWeight: 500,
              }}
            >
              1
            </MenuItem>
            <MenuItem
              value={2}
              sx={{
                color: "#321F47",
                fontFamily: "Montserrat",
                fontWeight: 500,
              }}
            >
              2
            </MenuItem>
            <MenuItem
              value={3}
              sx={{
                color: "#321F47",
                fontFamily: "Montserrat",
                fontWeight: 500,
              }}
            >
              3
            </MenuItem>
          </Select>
        </Box>

        <OutlinedInput
          startAdornment={
            <PinDropRoundedIcon
              sx={{
                color: "#321F47",
              }}
            />
          }
          sx={{
            width: "85%",
            height: "3rem",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            "& .MuiOutlinedInput-root": {
              color: "#321F47",
            },
          }}
          placeholder="Point de rendez-vous"
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "30%",
          }}
        >
          <Typography
            textAlign="center"
            variant="h3"
            sx={{
              fontSize: "1.5rem",
              fontFamily: "Montserrat",
              fontWeight: 600,
            }}
          >
            Choisis ton prix !
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "80%",
              height: "70%",
            }}
          >
            <Button
              onClick={handleMinusPrice}
              sx={{
                minWidth: "2rem",
                backgroundColor: "#321F47",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                color: "#FDC55E",
              }}
            >
              <RemoveIcon />
            </Button>{" "}
            <Typography
              sx={{
                fontSize: "2.5rem",
                fontFamily: "Montserrat",
                color: "#321F47",
                fontWeight: 600,
                width: "40%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {price}{" "}
              <EuroRoundedIcon
                sx={{
                  fontSize: "2.5rem",
                  color: "#321F47",
                  fontWeight: "bold",
                }}
              />
            </Typography>
            <Button
              onClick={handlePlusPrice}
              sx={{
                minWidth: "2rem",
                backgroundColor: "#321F47",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                color: "#FDC55E",
              }}
            >
              <AddIcon />{" "}
            </Button>
          </Box>
          <CreateJourneyBtn onClick={handleSubmit} />
        </Box>
      </Box>
    </Paper>
  );
};

export default FormTrip;
