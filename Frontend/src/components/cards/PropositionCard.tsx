import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
import { Card, CardActionArea, Typography } from "@mui/material";

interface PropositionCardProps {
  villeDepart: string;
  villeArrivee: string;
}
export default function PropositionCard({
  villeDepart,
  villeArrivee,
}: PropositionCardProps) {
  return (
    <Card
      sx={{
        width: "45%",
        height: "5vh",
      }}
    >
      <CardActionArea
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <WhatshotRoundedIcon sx={{ fontSize: "1rem", color: "#FF4500" }} />
        <Typography
          sx={{ fontFamily: "Montserrat", color: "#321F47", fontWeight: 500 }}
        >
          {villeDepart}
        </Typography>
        <ArrowRightAltRoundedIcon
          sx={{
            color: "#321F47",
          }}
        />
        <Typography
          sx={{ fontFamily: "Montserrat", color: "#321F47", fontWeight: 500 }}
        >
          {villeArrivee}
        </Typography>
      </CardActionArea>
    </Card>
  );
}
