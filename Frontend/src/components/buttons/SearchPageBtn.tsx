import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Button, Typography } from "@mui/material";
import { ISearchPageBtn } from "../../interfaces/components/ISearchPageBtn";

export default function SearchPageBtn({ label, onclick }: ISearchPageBtn) {
  return (
    <Button
      onClick={onclick}
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
        {label}
      </Typography>
    </Button>
  );
}
