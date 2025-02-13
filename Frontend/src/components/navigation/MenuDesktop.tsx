import { Box, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import LogoutCard from "../cards/LogoutCard";

interface IMenuDesktop {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export default function MenuDesktop({
  isOpen,
  anchorEl,
  onClose,
}: IMenuDesktop) {
  const { userData } = useUserContext();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // État pour ouvrir la boîte de dialogue

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true); // Ouvrir la boîte de dialogue quand "Se déconnecter" est cliqué
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false); // Fermer la boîte de dialogue
  };

  return (
    <Box>
      <Menu
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiPaper-root": {
            borderRadius: "0.5rem",
            minWidth: 250,
            color: "rgb(55, 65, 81)",
            boxShadow:
              "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            "& .MuiMenu-list": {
              padding: "4px 0",
            },
          },
        }}
      >
        {!userData
          ? [
              <NavLink
                to="/login"
                style={{
                  textDecoration: "none",
                }}
                key="login-link"
              >
                <MenuItem
                  key="item-login-link"
                  onClick={onClose}
                  sx={{
                    textDecoration: "none",
                    fontFamily: "Montserrat",
                    color: "#321F47",
                    fontWeight: 500,
                  }}
                >
                  Connexion
                </MenuItem>
              </NavLink>,
              <NavLink
                to="/register"
                style={{
                  textDecoration: "none",
                }}
                key="register-link"
              >
                <MenuItem
                  key="item-register-link"
                  onClick={onClose}
                  sx={{
                    textDecoration: "none",
                    fontFamily: "Montserrat",
                    color: "#321F47",
                    fontWeight: 500,
                  }}
                >
                  Inscription
                </MenuItem>
              </NavLink>,
            ]
          : [
              <NavLink
                to="/profil"
                style={{
                  textDecoration: "none",
                }}
                key="profil-link"
              >
                <MenuItem
                  key="item-profil-link"
                  onClick={onClose}
                  sx={{
                    fontFamily: "Montserrat",
                    color: "#321F47",
                    fontWeight: 500,
                  }}
                >
                  Profil
                </MenuItem>
              </NavLink>,
              <NavLink
                to="/messagerie"
                style={{
                  textDecoration: "none",
                }}
                key="chat-link"
              >
                <MenuItem
                  key="item-chat-link"
                  onClick={onClose}
                  sx={{
                    fontFamily: "Montserrat",
                    color: "#321F47",
                    fontWeight: 500,
                  }}
                >
                  Messagerie
                </MenuItem>
              </NavLink>,
              <NavLink
                to="/notifications"
                style={{
                  textDecoration: "none",
                }}
                key="chat-link"
              >
                <MenuItem
                  key="item-chat-link"
                  onClick={onClose}
                  sx={{
                    fontFamily: "Montserrat",
                    color: "#321F47",
                    fontWeight: 500,
                  }}
                >
                  Notifications
                </MenuItem>
              </NavLink>,
              <MenuItem
                key="logout-link"
                onClick={handleLogoutClick}
                sx={{
                  fontFamily: "Montserrat",
                  color: "#321F47",
                  fontWeight: 500,
                }}
              >
                Se déconnecter
              </MenuItem>,
            ]}
      </Menu>
      <LogoutCard
        open={logoutDialogOpen}
        onClose={() => {
          handleLogoutDialogClose();
          onClose();
        }}
      />
    </Box>
  );
}
