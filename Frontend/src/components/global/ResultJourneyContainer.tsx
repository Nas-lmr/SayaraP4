import { Box, Typography } from "@mui/material";
import ResultJourneyCard from "../cards/ResultJourneyCard";
// import { IResultContainer } from "../../interfaces/components/trajet/IResultContainer";

export default function ResultJourneyContainer() {
  // { results }: IResultContainer

  // if (results.length === 0) {
  //   return (
  //     <Typography
  //       textAlign="center"
  //       sx={{
  //         width: "100%",
  //         fontSize: { xs: "1.2rem", md: "1.5rem" },
  //         fontFamily: "Montserrat",
  //         color: "#321F47",
  //         fontWeight: 500,
  //         pt: "2rem",
  //       }}
  //     >
  //       Aucun résultat trouvé.
  //     </Typography>
  //   );
  // }
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
          Départ le 24/09/2024
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
        <ResultJourneyCard />
        <ResultJourneyCard />
        <ResultJourneyCard />

        {/* {results.map((journey) => (
          <ResultJourneyCard key={journey.id} journey={journey} />
        ))} */}
      </Box>
    </Box>
  );
}
