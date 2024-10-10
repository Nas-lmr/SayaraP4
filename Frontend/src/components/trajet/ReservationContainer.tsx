import { Box } from "@mui/material";
import StripeWrapper from "../Stripewarpper";
//TODO REMOVE CPNT
export default function ReservationContainer() {
  return (
    <Box>
      {/* <Typography>ville depart:{trajet?.departureCity.name}</Typography>
      <Typography>ville arrivee:{trajet?.destinationCity.name}</Typography>
      <Typography>price:{trajet?.pricePerSeat}</Typography>
      <Typography>places dispo:{trajet?.availableSeats}</Typography> */}
      <StripeWrapper />
    </Box>
  );
}
