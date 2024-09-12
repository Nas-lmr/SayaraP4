import { Box, Typography } from "@mui/material";
// import { useState } from "react";
import Searchbar from "./Searchbar";
import SearchbarDesktop from "./SearchbarDesktop";

export default function TopSearchCpnt() {
  //ELEMENT A DECOMMENTER LORSQUE SERVICE RECHERCHE EST PRET

  // const [departureCity, setDepartureCity] = useState("");
  // const [arrivalCity, setArrivalCity] = useState("");
  // const [travelDate, setTravelDate] = useState("");
  // const [passengers, setPassengers] = useState(1);
  // const [searchResults, setSearchResults] = useState([]);

  // const handleSearch = async () => {
  //   try {
  //     const response = await fetch(
  //       APPELER LE SERVICE ICI
  //     );
  //     const data = await response.json();
  //     setSearchResults(data.results);
  //     console.log(data.results);
  //   } catch (error) {
  //     console.error("Erreur lors de la recherche :", error);
  //   }
  // };

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
      // departureCity={departureCity}
      // setDepartureCity={setDepartureCity}
      // arrivalCity={arrivalCity}
      // setArrivalCity={setArrivalCity}
      // travelDate={travelDate}
      // setTravelDate={setTravelDate}
      // passengers={passengers}
      // setPassengers={setPassengers}
      // onSearch={handleSearch}
      />
      <Searchbar
      // departureCity={departureCity}
      // setDepartureCity={setDepartureCity}
      // arrivalCity={arrivalCity}
      // setArrivalCity={setArrivalCity}
      // travelDate={travelDate}
      // setTravelDate={setTravelDate}
      // passengers={passengers}
      // setPassengers={setPassengers}
      // onSearch={handleSearch}
      />
    </Box>
  );
}
