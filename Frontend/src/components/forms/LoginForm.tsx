import { Box, Paper, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import LoginRegisterBtn from "../buttons/LoginRegisterBtn";

export default function LoginForm() {
  return (
    <Paper
      component="form"
      sx={{
        width: "20rem",
        height: "40vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        borderRadius: "0.5rem",
      }}
    >
      <Typography
        textAlign="center"
        variant="h1"
        sx={{
          fontSize: "1.5rem",
          pt: "1.5rem",
          pl: "0.8rem",
          pr: "0.8rem",
          lineHeight: 1.5,
          color: "#321F47",
        }}
      >
        Se connecter
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          sx={{
            width: "85%",
            "& .MuiOutlinedInput-root ": {
              height: "5.5vh",
              display: "flex",
              alignItems: "center",
              "&.Mui-focused fieldset": {
                borderColor: "#321F47",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#321F47",
              fontFamily: "Montserrat",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#321F47",
            },
          }}
        />
        <TextField
          variant="outlined"
          label="Mot de passe"
          type="password"
          sx={{
            width: "85%",
            "& .MuiOutlinedInput-root ": {
              height: "5.5vh",
              display: "flex",
              alignItems: "center",
              "&.Mui-focused fieldset": {
                borderColor: "#321F47",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#321F47",
              fontFamily: "Montserrat",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#321F47",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          width: "80%",
          height: "25%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.8rem",
            color: "#321F47",
          }}
        >
          Pas encore de compte ?{" "}
          <NavLink
            to="/register"
            style={{
              color: "#321F47",
              textDecoration: "none",
              fontFamily: "Montserrat",
              fontWeight: 500,
            }}
          >
            Inscris-toi !
          </NavLink>
        </Typography>
        <LoginRegisterBtn
          label="Se connecter"
          onclick={() => console.log("CONNEXION")}
          type="submit"
        />
      </Box>
    </Paper>
  );
}
