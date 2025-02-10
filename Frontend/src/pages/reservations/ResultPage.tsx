import { Container } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultJourneyContainer from "../../components/global/ResultJourneyContainer";
import Searchbar from "../../components/search/Searchbar";
import SearchbarDesktop from "../../components/search/SearchbarDesktop";
import { ISearchTrajet } from "../../interfaces/services/ISearchTrajet";
import { formatDate } from "../../services/common/ConversionValue";
import { searchTrajet } from "../../services/trajet/trajetService";

export default function ResultPage() {
  const location = useLocation();
  const { results } = location.state || { results: null };

  const [departureCity, setDepartureCity] = useState<string>("");
  const [arrivalCity, setArrivalCity] = useState<string>("");
  const [travelDate, setTravelDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState<number>(1);
  const [availableSeats, setAvailableSeats] = useState<number>(1);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const handleSearch = async () => {
    // Validation des paramètres avant la recherche

    if (!departureCity || !arrivalCity || !travelDate) {
      setError("Veuillez remplir tous les champs");
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
      setError("");
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue lors de la recherche. Veuillez réessayer.");
    }
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        pt: "5.5rem",
        pb: "3rem",
        backgroundColor: "#F4F4F4",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
        availableSeats={availableSeats}
        setAvailableSeats={setAvailableSeats}
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
        availableSeats={availableSeats}
        setAvailableSeats={setAvailableSeats}
      />
         {error && (
        <div style={{ color: "red", fontWeight: "bold", marginTop: "1rem" }}>
          {error}
        </div>
      )}
      {results ? (
        <ResultJourneyContainer results={results.data} />
      ) : (
        <div>Aucun résultat trouvé</div>
      )}
    </Container>
  );
}
