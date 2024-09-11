import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Button, Typography } from "@mui/material";
import { ISearchPageBtn } from "../../interfaces/components/ISearchPageBtn";

export default function ProfilBtn({ label, onclick, type }: ISearchPageBtn) {
  return (
    <Button
      onClick={onclick}
      variant="contained"
      type={type}
      endIcon={<ArrowForwardIosRoundedIcon sx={{ color: "#FDC55E" }} />}
      sx={{
        backgroundColor: "#321F47",
        display: "flex",
        justifyContent: "space-between",
        height: "6vh",
        width: "21rem",
        textTransform: "none",
      }}
    >
      <Typography
        sx={{ color: "#FDC55E", fontFamily: "Montserrat", fontWeight: 500 }}
      >
        {label}
      </Typography>
    </Button>
  );
}
