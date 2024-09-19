import { Button } from "@mui/material";
import { ISearchBtn } from "../../interfaces/components/buttons/ISearchBtn";

export default function SearchJourneyBtn({ onClose, onClick }: ISearchBtn) {
  const handleClick = () => {
    onClick();
    onClose();
  };

  return (
    <Button
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
