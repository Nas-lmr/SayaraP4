import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Button, Typography } from "@mui/material";
import { ISearchPageBtn } from "../../interfaces/components/buttons/ISearchPageBtn";

export default function SearchPageBtn({
  label,
  onclick,
  type,
}: ISearchPageBtn) {
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
        height: "3rem",
        width: { xs: "21rem", sm: "100%", md: "23rem" },
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
