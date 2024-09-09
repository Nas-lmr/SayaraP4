import { Box, Typography } from "@mui/material";
import NotificationCard from "../cards/NotificationCard";

export default function NotificationContainer() {
  return (
    <Box sx={{ height: "100%", width: "90%", pt: "1rem" }}>
      <Typography
        variant="h1"
        textAlign="center"
        sx={{
          color: "#FDC55E",
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: "1.7rem",
        }}
      >
        Centre de notifications
      </Typography>
      <Box sx={{ height: "90%", width: "100%", pt: "2rem" }}>
        <NotificationCard />
      </Box>
    </Box>
  );
}
