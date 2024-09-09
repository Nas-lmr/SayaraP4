import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
// import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

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
      <AppBar sx={{ backgroundColor: "white", height: "4rem" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            height: "100%",
          }}
        >
          <Box
            component="img"
            src="../src/assets/images/Sayara-logo.png"
            alt="Logo Sayara"
            sx={{ height: "90%" }}
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
              display: !userData ? "none" : "",
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
