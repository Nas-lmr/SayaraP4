import { Button, Typography } from "@mui/material";
import { IFormsBtn } from "../../interfaces/components/IFormsBtn";

export default function LoginRegisterBtn({ label, onclick, type }: IFormsBtn) {
  return (
    <Button
      onClick={onclick}
      variant="contained"
      type={type}
      sx={{
        backgroundColor: "#321F47",
        display: "flex",
        justifyContent: "center",
        height: "5vh",
        width: "85%",
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
