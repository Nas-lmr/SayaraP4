import { Button } from "@mui/material";
import { INextStepBtn } from "../../interfaces/components/INextStepBtn";

export default function NextStepBtn({ onClick, label }: INextStepBtn) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        width: { xs: "20rem", md: "30rem" },
        height: { xs: "5vh" },
        backgroundColor: "#321F47",
        color: "#FDC55E",
        fontFamily: "Montserrat",
        borderRadius: "0.5rem",
      }}
    >
      {label}
    </Button>
  );
}
