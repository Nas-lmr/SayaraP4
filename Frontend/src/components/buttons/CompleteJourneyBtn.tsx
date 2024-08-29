import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Button, Typography } from "@mui/material";

export default function CompleteJourneyBtn() {
  return (
    <Button
      variant="contained"
      endIcon={<ArrowForwardIosRoundedIcon sx={{ color: "#FDC55E" }} />}
      sx={{
        backgroundColor: "#321F47",
        displlay: "flex",
        justifyContent: "space-between",
        height: "5vh",
        width: "100%",
        textTransform: "none",
      }}
    >
      <Typography
        sx={{ color: "#FDC55E", fontFamily: "Montserrat", fontWeight: 500 }}
      >
        Mes trajets effectués
      </Typography>
    </Button>
  );
}
