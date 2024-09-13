import { Button } from "@mui/material";

export default function CreateJourneyBtn({ onClick }: { onClick: () => void }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      sx={{
        width: "90%",
        height: "5vh",
        p: 0,
        backgroundColor: "#321F47",
        color: "#FDC55E",
        borderRadius: "0.5rem",
        fontFamily: "Montserrat",
        textTransform: "none",
      }}
    >
      Suivant
    </Button>
  );
}
