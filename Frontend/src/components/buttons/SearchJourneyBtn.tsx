import { Button } from "@mui/material";

export default function SearchJourneyBtn() {
  return (
    <Button
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
