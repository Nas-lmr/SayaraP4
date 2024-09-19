import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISearchTrajet } from "../../interfaces/services/ISearchTrajet";
import { formatDate } from "../../services/common/ConversionValue";
import { searchTrajet } from "../../services/trajet/trajetService";
import Searchbar from "./Searchbar";
import SearchbarDesktop from "./SearchbarDesktop";

export default function TopSearchCpnt() {
  const navigate = useNavigate();
  const [departureCity, setDepartureCity] = useState<string>("");
  const [arrivalCity, setArrivalCity] = useState<string>("");
  const [travelDate, setTravelDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState<number>(1);

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
      <SearchbarDesktop
        departureCity={departureCity}
        setDepartureCity={setDepartureCity}
        arrivalCity={arrivalCity}
        setArrivalCity={setArrivalCity}
        travelDate={travelDate}
        setTravelDate={setTravelDate}
        passengers={passengers}
        setPassengers={setPassengers}
        onSearch={handleSearch}
      />
      <Searchbar
        departureCity={departureCity}
        setDepartureCity={setDepartureCity}
        arrivalCity={arrivalCity}
        setArrivalCity={setArrivalCity}
        travelDate={travelDate}
        setTravelDate={setTravelDate}
        passengers={passengers}
        setPassengers={setPassengers}
        onSearch={handleSearch}
      />
    </Box>
  );
}
