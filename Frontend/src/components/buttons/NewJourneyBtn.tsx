import { AddRounded } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function NewJourneyBtn() {
  return (
    <Fab
      component={NavLink}
      to="/trajet/nouveau-trajet"
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: "4.5rem",
        right: "1rem",
        backgroundColor: "#321F47",
        display: { md: "none" },
      }}
    >
      <AddRounded fontSize="large" sx={{ color: "#FDC55E" }} />
    </Fab>
  );
}
