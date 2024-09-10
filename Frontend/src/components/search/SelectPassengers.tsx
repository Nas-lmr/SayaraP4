import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { Box, Card, Typography } from "@mui/material";
import { ISelectPassengers } from "../../interfaces/components/ISelectPassengers";

export default function SelectPassengers({
  passenger,
  setPassenger,
}: ISelectPassengers) {
  const handleAdd = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (passenger < 3) {
      setPassenger(passenger + 1);
    }
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (passenger > 1) {
      setPassenger(passenger - 1);
    }
  };

  return (
    <Card
      sx={{
        width: "15rem",
        height: "4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#F4F4F4",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Montserrat",
          fontWeight: 500,
          color: "#321F47",
        }}
      >
        {passenger > 1 ? "Passagers" : "Passager"}{" "}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          width: "30%",
          justifyContent: "space-around",
        }}
      >
        <RemoveCircleOutlineRoundedIcon
          fontSize="small"
          onClick={handleRemove}
          sx={{
            color: "#321F47",
          }}
        />
        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 500,
            color: "#321F47",
          }}
        >
          {passenger}{" "}
        </Typography>

        <AddCircleOutlineRoundedIcon
          fontSize="small"
          onClick={handleAdd}
          sx={{
            color: "#321F47",
          }}
        />
      </Box>
    </Card>
  );
}
