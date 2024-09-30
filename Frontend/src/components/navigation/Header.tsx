import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
// import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import NavDesktop from "./NavDesktop";
import logo from "/assets/images/Sayara-logo.png";

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const { userData } = useUserContext();

  const activeStyle = {
    backgroundColor: "#321F47",
    color: "#FDC55E",
    height: "90%",
    borderRadius: "0 0 1rem 1rem",
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ backgroundColor: "white", height: { xs: "4rem", md: "4.5rem" } }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            height: "100%",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo Sayara"
            sx={{ height: "90%", zIndex: 1000 }}
          />
          <Button
            component={NavLink}
            to="/notifications"
            sx={{
              p: 0,
              minWidth: 50,
              maxWidth: 60,
              height: "90%",
              boderRadius: 0,
              backgroundColor:
                pathname === "/notifications"
                  ? activeStyle.backgroundColor
                  : "",
              borderRadius:
                pathname === "/notifications" ? activeStyle.borderRadius : "",
              display: { xs: !userData ? "none" : "", md: "none" },
            }}
          >
            <NotificationsNoneRoundedIcon
              fontSize="large"
              sx={{
                color:
                  pathname === "/notifications" ? activeStyle.color : "#321F47",
              }}
            />
            {/* 
            TODO A REMETTRE EN PLACE LORSQUE NOTIF RECU
            <Badge
              overlap="circular"
              color="error"
              variant="dot"
              invisible={pathname === "/notifications"}
            >
              
                 <NotificationsActiveRoundedIcon/>
            </Badge> */}
          </Button>
          <NavDesktop />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
