import { Container } from "@mui/material";
import LoginForm from "../../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        m: 0,
        height: "100vh",
        pt: "4rem",
        pb: "3rem",
        backgroundColor: "#F4F4F4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm />
    </Container>
  );
}
