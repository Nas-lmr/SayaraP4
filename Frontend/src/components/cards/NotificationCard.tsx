import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MoodBadRoundedIcon from "@mui/icons-material/MoodBadRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import ToProfilBtn from "../buttons/ToProfilBtn";
import DetailNotification from "./DetailNotification";

export default function NotificationCard() {
  return (
    <>
      <Accordion sx={{ "&.MuiPaper-root": { borderRadius: "0.5rem 0.5rem " } }}>
        <AccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon />}>
          <MoodBadRoundedIcon color="error" />
          <Typography
            alignContent="center"
            sx={{
              pl: "0.5rem",
              fontSize: "0.8rem",
              fontFamily: "Montserrat",
              fontWeight: 500,
              color: "#321F47",
            }}
          >
            Aristide a refusé votre réservation
          </Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails
          sx={{
            height: "8rem",
            p: 0,
          }}
        >
          <DetailNotification />
        </AccordionDetails>
        <Divider />
        <ToProfilBtn />
      </Accordion>
    </>
  );
}
