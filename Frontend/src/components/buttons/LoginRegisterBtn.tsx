import { Button, Typography } from "@mui/material";
import { IFormsBtn } from "../../interfaces/components/buttons/IFormsBtn";

export default function LoginRegisterBtn({ label, type }: IFormsBtn) {
  return onclick !== undefined ? (
    <Button
      onClick={() => onclick}
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
  ) : (
    <Button
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
