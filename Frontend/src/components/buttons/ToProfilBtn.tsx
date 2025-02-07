import { ArrowForwardIosRounded } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Notification } from "../../interfaces/notification/notification";

interface DetailNotificationProps {
  informations: Notification; 
}

export default function ToProfilBtn({informations}: DetailNotificationProps) {
  return (
    <Button
      variant="contained"
      endIcon={
        <ArrowForwardIosRounded sx={{ color: "#321F47", fontSize: "1em" }} />
      }
      sx={{
        display: "flex",
        justifyContent: "space-between",
        height: "4vh",
        width: "100%",
        textTransform: "none",
        borderRadius: " 0 0 0.5rem 0.5rem",
        backgroundColor: "white",
      }}
    >
      <Typography
        sx={{ color: "#321F47", fontFamily: "Montserrat", fontWeight: 500 }}
      >
        {informations.user.username}
      </Typography>
    </Button>
  );
}
