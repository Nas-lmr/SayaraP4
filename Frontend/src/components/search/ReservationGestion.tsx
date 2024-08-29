import { Box, Typography } from "@mui/material";
import HistoryBtn from "../buttons/HistoryBtn";
import MyBookingBtn from "../buttons/MyBookingBtn";

export default function ReservationGestion() {
  return (
    <>
      <Typography
        textAlign="start"
        variant="h2"
        sx={{
          pl: "1rem",
          fontSize: "1.5rem",
          fontFamily: "Montserrat",
          fontWeight: 600,
        }}
      >
        Gères tes réservations:
      </Typography>
      <Box
        sx={{
          pr: "1rem",
          pl: "1rem",
          height: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.8rem",
        }}
      >
        <MyBookingBtn />
        <HistoryBtn />
      </Box>
    </>
  );
}
