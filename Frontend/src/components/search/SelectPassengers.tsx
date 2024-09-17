import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { Box, Card, Typography } from "@mui/material";
import { ISelectPassengers } from "../../interfaces/components/ISelectPassengers";

export default function SelectPassengers({
  numberPassenger,
  setNumberPassenger,
}: ISelectPassengers) {
  const handleAdd = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (numberPassenger < 3) {
      setNumberPassenger(numberPassenger + 1);
    }
  };

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (numberPassenger > 1) {
      setNumberPassenger(numberPassenger - 1);
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
        {numberPassenger > 1 ? "Passagers" : "Passager"}{" "}
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
            color: numberPassenger > 1 ? "#321F47" : "#E0E0E0", // Grise si on ne peut pas retirer
            cursor: numberPassenger > 1 ? "pointer" : "not-allowed", // Désactive le clic si 1 passager
          }}
        />
        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 500,
            color: "#321F47",
          }}
        >
          {numberPassenger}{" "}
        </Typography>

        <AddCircleOutlineRoundedIcon
          fontSize="small"
          onClick={handleAdd}
          sx={{
            color: numberPassenger < 3 ? "#321F47" : "#E0E0E0", // Grise si on ne peut pas retirer
            cursor: numberPassenger < 3 ? "pointer" : "not-allowed", // Désactive le clic si 1 passager
          }}
        />
      </Box>
    </Card>
  );
}
