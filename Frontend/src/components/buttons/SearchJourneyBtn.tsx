import { Button } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

export default function SearchJourneyBtn({ onClose }: { onClose: () => void }) {
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/trajet/resultats") {
      onClose();
    }
  };

  return (
    <Button
      component={NavLink}
      to="/trajet/resultats"
      onClick={handleClick}
      variant="contained"
      sx={{
        width: "100%",
        height: "13%",
        p: 0,
        backgroundColor: "#321F47",
        color: "#FDC55E",
        borderRadius: "0 0 1rem 1rem",
        fontFamily: "Montserrat",
        textTransform: "none",
      }}
    >
      Rechercher un trajet
    </Button>
  );
}
