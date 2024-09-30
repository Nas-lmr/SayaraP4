import { Box, Menu, MenuItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

export default function MenuDesktop({ isOpen, anchorEl, onClose }) {
  const { userData } = useUserContext();

  return (
    <Box>
      <Menu
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "0.5rem",
            minWidth: 200,
            color: "rgb(55, 65, 81)",
            boxShadow:
              "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            "& .MuiMenu-list": {
              padding: "4px 0",
            },
          },
        }}
      >
        {!userData ? (
          <>
            <NavLink
              to="/login"
              style={{
                textDecoration: "none",
                fontFamily: "Montserrat",
                color: "#321F47",
              }}
            >
              <MenuItem onClick={onClose}>Connexion</MenuItem>
            </NavLink>
            <NavLink
              to="/register"
              style={{
                textDecoration: "none",
                fontFamily: "Montserrat",
                color: "#321F47",
              }}
            >
              <MenuItem onClick={onClose}>Inscription</MenuItem>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/profil"
              style={{
                textDecoration: "none",
                fontFamily: "Montserrat",
                color: "#321F47",
              }}
            >
              <MenuItem onClick={onClose}>Profil</MenuItem>
            </NavLink>
            <NavLink
              to="/messagerie"
              style={{
                textDecoration: "none",
                fontFamily: "Montserrat",
                color: "#321F47",
              }}
            >
              <MenuItem onClick={onClose}>Messagerie</MenuItem>
            </NavLink>
          </>
        )}
      </Menu>
    </Box>
  );
}
