import { Card, Checkbox, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { IItineraireCard } from "../../interfaces/components/IItineraireCard";

export default function ItineraireCard({
  onCheckboxChange,
  // checked,
  distance,
  duration,
}: IItineraireCard) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onCheckboxChange(isChecked);
  };
  const formatDuration = (seconds: number | null) => {
    if (!seconds) return null;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.round((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const kilometersFormat = (meters: number | null) => {
    if (!meters) return null;
    const kilometers = Math.floor(meters / 1000);
    return `${kilometers}`;
  };
  return (
    <Card
      sx={{
        height: { xs: "8vh", md: "10vh", lg: "12vh" },
        width: { xs: "90%", md: "90%" },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: !checked ? "white" : "#321F47",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "0.8rem", sm: "1rem" },
          fontFamily: "Montserrat",
          color: checked ? "white" : "#321F47",
          fontWeight: 600,
          width: "30%",
          height: { xs: "25%", sm: "30%" },
        }}
      >
        Itinéraire n° 1:
      </Typography>
      {duration && distance && (
        <>
          <Typography
            sx={{
              fontSize: { xs: "0.8rem", sm: "1rem" },
              fontFamily: "Montserrat",
              color: checked ? "white" : "#321F47",
              fontWeight: 500,
              width: "20%",
              height: { xs: "25%", sm: "30%" },
            }}
          >
            {kilometersFormat(distance)} km
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.8rem", sm: "1rem" },
              fontFamily: "Montserrat",
              color: checked ? "white" : "#321F47",
              fontWeight: 500,
              width: "20%",
              height: { xs: "25%", sm: "30%" },
            }}
          >
            {formatDuration(duration)}
          </Typography>
        </>
      )}
      <Checkbox
        sx={{
          "&.MuiButtonBase-root": { color: !checked ? "#321F47" : "#FDC55E" },
        }}
        checked={checked}
        onChange={handleCheckboxChange}
      />
    </Card>
  );
}
