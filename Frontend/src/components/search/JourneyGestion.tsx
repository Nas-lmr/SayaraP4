import { Box, Typography } from "@mui/material";
import CompleteJourneyBtn from "../buttons/CompleteJourneyBtn";
import MyJourneyBtn from "../buttons/MyJourneyBtn";
import NewSearchJourneyBtn from "../buttons/NewSearchJourneyBtn";

export default function JourneyGestion() {
  return (
    <>
      <Typography
        textAlign="start"
        variant="h2"
        sx={{
          pt: "1rem",
          pl: "1rem",
          fontSize: "1.5rem",
          fontFamily: "Montserrat",
          fontWeight: 600,
        }}
      >
        Gères tes trajets :
      </Typography>
      <Box
        sx={{
          pr: "1rem",
          pl: "1rem",
          height: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.8rem",
        }}
      >
        <NewSearchJourneyBtn />
        <MyJourneyBtn />
        <CompleteJourneyBtn />
      </Box>
    </>
  );
}
