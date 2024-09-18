import { Container } from "@mui/material";
import ResultJourneyContainer from "../../components/global/ResultJourneyContainer";
import Searchbar from "../../components/search/Searchbar";
import SearchbarDesktop from "../../components/search/SearchbarDesktop";

import { useLocation } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const { results } = location.state || { results: null }; // On récupère les deux types de résultats

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
      {/* <SearchbarDesktop />
      <Searchbar /> */}
      {results ? (
        <ResultJourneyContainer results={results.data} />
      ) : (
        <div>Aucun résultat trouvé</div> // Message d'erreur s'il n'y a pas de résultats
      )}
    </Container>
  );
}
