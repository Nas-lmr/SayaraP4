import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NextStepBtn from "../buttons/NextStepBtn";
import ProposedItineraireContainer from "./ProposedItineraireContainer";
import RoadMap from "./RoadMap";

export default function ItineraireContainer() {
  const [isChecked, setIsChecked] = useState(false);
  const [distance, setDistance] = useState<number | null>(null); // Add state for distance
  const [duration, setDuration] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { villeDepart, villeArrive, date, time, price, passager } =
    location.state || {};

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleRouteData = (distance: number, duration: number) => {
    setDistance(distance);
    setDuration(duration);
  };

  const handleNextStep = () => {
    if (
      isChecked &&
      villeDepart &&
      villeArrive &&
      date &&
      time &&
      distance &&
      duration &&
      price &&
      passager
    ) {
      navigate("/trajet/nouveau-trajet/confirmation", {
        state: {
          villeDepart,
          villeArrive,
          date,
          time,
          distance,
          duration,
          price,
          passager,
        },
      });
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "1rem",
        backgroundColor: "white",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "1.5rem",
          fontFamily: "Montserrat",
          color: "#321F47",
          fontWeight: 500,
        }}
      >
        Choisis un itinéraire !
      </Typography>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "space-around",
          pt: "1rem",
        }}
      >
        <Box
          sx={{
            height: { xs: "50%", md: "100%" },
            width: { xs: "90%", sm: "90%", md: "50%" },
            display: "flex",
          }}
        >
          <RoadMap onRouteData={handleRouteData} />
        </Box>
        <Box
          sx={{
            height: { xs: "50%", md: "100%" },
            width: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <ProposedItineraireContainer
            onCheckboxChange={handleCheckboxChange}
            distance={distance}
            duration={duration}
          />
          {isChecked && (
            <NextStepBtn onClick={handleNextStep} label="Suivant" />
          )}
        </Box>
      </Box>
    </Box>
  );
}
