import { Button } from "@mui/material";

export default function NextStepBtn() {
  return (
    <Button
      variant="contained"
      sx={{
        width: { xs: "80%" },
        height: { xs: "5vh" },
        backgroundColor: "#321F47",
        color: "#FDC55E",
        fontFamily: "Montserrat",
        borderRadius: "0.5rem",
      }}
    >
      Suivant
    </Button>
  );
}
