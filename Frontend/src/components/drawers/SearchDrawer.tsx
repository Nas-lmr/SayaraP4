import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { IDrawer } from "../../interfaces/components/IDrawer";
import SearchForm from "../forms/SearchForm";

export default function SearchDrawer({
  isOpen,
  onclose,
  departureCity,
  setDepartureCity,
  arrivalCity,
  setArrivalCity,
  travelDate,
  setTravelDate,
  passengers,
  setPassengers,
  onSearch,
}: IDrawer) {
  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={onclose}
      PaperProps={{
        sx: {
          height: "100vh",
          backgroundColor: "#F4F4F4",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "10vh",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <IconButton size="large" onClick={onclose}>
          <CloseRoundedIcon fontSize="large" sx={{ color: "#321F47" }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: "1.7rem", fontFamily: "Montserrat", fontWeight: 500 }}
        >
          Où veux-tu aller ?
        </Typography>
        <SearchForm
          onclose={onclose}
          departureCity={departureCity}
          setDepartureCity={setDepartureCity}
          arrivalCity={arrivalCity}
          setArrivalCity={setArrivalCity}
          travelDate={travelDate}
          setTravelDate={setTravelDate}
          passengers={passengers}
          setPassengers={setPassengers}
          onSearch={onSearch}
        />
        <Box
          component="img"
          src="../src/assets/images/covoiturage.png"
          alt="Deux hommes s'interrogent"
          sx={{ height: "30%", width: "80%" }}
        />
      </Box>
    </Drawer>
  );
}
