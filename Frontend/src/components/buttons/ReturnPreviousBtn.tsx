import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ReturnPreviousBtn() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <IconButton onClick={handleBackClick}>
      <ArrowBackRoundedIcon
        sx={{ color: "#321F47", fontSize: { xs: "1.8rem", md: "2rem" } }}
      />
    </IconButton>
  );
}
