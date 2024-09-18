import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import SearchDrawer from "../drawers/SearchDrawer";
import { ISearchbarProps } from "../../interfaces/components/trajet/ISearchbarProps";

export default function Searchbar({
  departureCity,
  setDepartureCity,
  arrivalCity,
  setArrivalCity,
  travelDate,
  setTravelDate,
  passengers,
  setPassengers,
  onSearch,
}: ISearchbarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const formatDate = (dateTime: Date | null): string => {
    if (!dateTime) {
      return ""; // Vous pouvez gérer ce cas en renvoyant une chaîne vide ou un message d'erreur personnalisé.
    }

    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = dateTime.getDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`; // Format DD/MM/YYYY
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "5vh",
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
          pl: "1rem",
          pr: "1rem",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<SearchRoundedIcon sx={{ color: "#321F47" }} />}
          sx={{
            height: "100%",
            width: "80%",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "flex-start",
            borderRight: "none",
            borderRadius: "0.5rem 0 0 0.5rem",
            borderColor: "rgb(50,31,71,30%)",
          }}
          onClick={handleOpenDrawer}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "flex-start",
              width: "100%",
            }}
          >
            <Typography
              textAlign="start"
              alignContent="center"
              sx={{
                fontSize: "0.8rem",
                color: "#321F47",
                fontFamily: "Montserrat",
                fontWeight: 500,
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              {departureCity}
              <span>
                <ArrowRightAltRoundedIcon
                  fontSize="small"
                  sx={{ pt: "0.2rem" }}
                />
              </span>
              {arrivalCity}
            </Typography>
            <Typography
              textAlign="start"
              sx={{
                fontSize: "0.8rem",
                color: "#321F47",
                fontFamily: "Montserrat",
                fontWeight: 500,
              }}
            >
              {formatDate(travelDate)}
            </Typography>
          </Box>
        </Button>
        <Button
          variant="outlined"
          sx={{
            height: "100%",
            width: "20%",
            backgroundColor: "white",
            borderLeft: "none",
            borderRadius: " 0 0.5rem 0.5rem 0",
            borderColor: "rgb(50,31,71,30%)",
          }}
        >
          <TuneRoundedIcon sx={{ color: "#321F47" }} />
        </Button>
        <SearchDrawer
          isOpen={isDrawerOpen}
          onclose={handleCloseDrawer}
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
      </Box>
    </>
  );
}
