import { Container } from "@mui/material";
import Searchbar from "../../components/search/Searchbar";
import ResultJourneyContainer from "../../components/global/ResultJourneyContainer";

export default function ResultPage() {
  return (
    <Container
      disableGutters
      sx={{
        height: "100vh",
        pt: "4rem",
        pb: "3rem",
        backgroundColor: "#F4F4F4",
      }}
    >
      <Searchbar />
      <ResultJourneyContainer />
    </Container>
  );
}
