import { Box, Paper, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerService } from "../../services/user/UserService";
import LoginRegisterBtn from "../buttons/LoginRegisterBtn";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleMailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { success } = await registerService({
      username,
      email,
      password,
    });

    if (success) {
      navigate("/login");
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "20rem",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
          fontFamily: "Montserrat",
          fontWeight: 500,
        }}
      >
        Inscris-toi !
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TextField
          variant="outlined"
          label="Pseudo"
          type="text"
          onChange={handleUsernameChange}
          value={username}
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
          label="Email"
          type="email"
          onChange={handleMailChange}
          value={email}
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
          onChange={handlePasswordChange}
          value={password}
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
          justifyContent: "space-around",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.8rem",
            color: "#321F47",
          }}
        >
          Déjà un compte ?{" "}
          <NavLink
            to="/login"
            style={{
              color: "#321F47",
              textDecoration: "none",
              fontFamily: "Montserrat",
              fontWeight: 500,
            }}
          >
            Connectes-toi !
          </NavLink>
        </Typography>
        <LoginRegisterBtn label="S'inscrire" type="submit" />
      </Box>
    </Paper>
  );
}
