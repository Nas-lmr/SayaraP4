import { Container } from "@mui/material";
import NotificationContainer from "../components/global/NotificationContainer";

export default function NotificationPage() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        pt: "4rem",
        pb: "3rem",
        backgroundColor: "#321F47",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <NotificationContainer />
    </Container>
  );
}
