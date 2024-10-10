import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import ToProfilBtn from "../buttons/ToProfilBtn";
import DetailNotification from "./DetailNotification";
import { Notification } from "../../interfaces/notification/notification";

interface DetailNotificationProps {
  informations: Notification; 
}

export default function NotificationCard({ informations }:DetailNotificationProps ) {
  
  
  return (
    <>
      <Accordion sx={{ "&.MuiPaper-root": { borderRadius: "0.5rem 0.5rem " } }}>
        <AccordionSummary
          expandIcon={<KeyboardArrowDownRoundedIcon />}
          sx={{
            "& .MuiAccordionSummary-content": {
              display: "flex",
              alignItems: "center",
            },
          }}
        >
          <LocationOnRoundedIcon sx={{ color: "#321F47" }} />
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
            {informations && informations.content}
          </Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails
          sx={{
            height: "8rem",
            p: 0,
          }}
        >
          <DetailNotification informations={ informations} />
        </AccordionDetails>
        <Divider />
        <ToProfilBtn informations={informations}  />
      </Accordion>
    </>
  );
}
