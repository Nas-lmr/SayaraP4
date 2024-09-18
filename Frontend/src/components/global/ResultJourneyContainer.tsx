import { Box, Typography } from "@mui/material";
import NoResult from "../../assets/images/NoResult.png";
import { IResultContainer } from "../../interfaces/components/trajet/IResultContainer";
import ResultJourneyCard from "../cards/ResultJourneyCard";

export default function ResultJourneyContainer({ results }: IResultContainer) {
  console.log(results, "DANS CONTAINER");

  if (!results || !Array.isArray(results) || results.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          textAlign="center"
          sx={{
            width: "100%",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            fontFamily: "Montserrat",
            color: "#321F47",
            fontWeight: 500,
            pt: "2rem",
          }}
        >
          Aucun résultat trouvé.
        </Typography>
        <Box
          component="img"
          src={NoResult}
          alt="Homme attendant debout"
          sx={{
            height: { xs: "60%", sm: "60%", md: "70%", lg: "80%" },
            width: { xs: "90%", sm: "70%", md: "60%", lg: "50%" },
          }}
        />
      </Box>
    );
  }

  const formatDate = (dateTime: string): string => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`; // Format DD/MM/YYYY
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "90%",
      }}
    >
      <Box>
        <Typography
          textAlign="center"
          sx={{
            width: { xs: "65%", sm: "50%" },
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            fontFamily: "Montserrat",
            color: "#321F47",
            fontWeight: 500,
            pt: "2rem",
            pl: "1rem",
          }}
        >
          Départ le {formatDate(results[0].departureDateTime)}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          pt: "1.5rem",
        }}
      >
        {/* <ResultJourneyCard />
        <ResultJourneyCard />
        <ResultJourneyCard /> */}

        {results &&
          Array.isArray(results) &&
          results.length > 0 &&
          results.map((journey) => (
            <ResultJourneyCard key={journey.id} trajet={journey} />
          ))}
      </Box>
    </Box>
  );
}
