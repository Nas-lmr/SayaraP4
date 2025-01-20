import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { AppBar, Badge, Box, Button, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import NavDesktop from "./NavDesktop";
import logo from "../../assets/images/Sayara-logo.png";

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const [message, setMessage] = useState<string | null>(null);
  const { userData, decodedToken } = useUserContext();

  const activeStyle = {
    backgroundColor: "#321F47",
    color: "#FDC55E",
    height: "90%",
    borderRadius: "0 0 1rem 1rem",
  };

  const ownerId = decodedToken?.id;
  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:3310/notifications/sse/${ownerId}`
    );

    eventSource.onmessage = function ({ data }) {
      try {
        const parsedData = JSON.parse(data);
        console.log(parsedData, "testets");
        setMessage(`${parsedData.message}`);
      } catch (error) {
        console.error("Failed to parse SSE data", error);
      }
    };

    eventSource.onerror = function (event) {
      console.error("SSE connection error:", event);
    };

    return () => {
      eventSource.close();
    };
  }, [ownerId]);

  useEffect(() => {
    if (pathname === "/notifications") {
      setMessage(null); // Réinitialise le message lorsque sur la page notifications
    }
  }, [pathname]);

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
          <NavLink to="/" style={{ height: "100%" }}>
            <Box
              component="img"
              src={logo}
              alt="Logo Sayara"
              sx={{ height: "95%", zIndex: 1000 }}
            />
          </NavLink>
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
            {!message ? (
              <NotificationsNoneRoundedIcon
                fontSize="large"
                sx={{
                  color:
                    pathname === "/notifications"
                      ? activeStyle.color
                      : "#321F47",
                }}
              />
            ) : (
              <Badge
                overlap="circular"
                color="error"
                variant="dot"
                invisible={pathname === "/notifications"}
                badgeContent={message}
              >
                <NotificationsActiveRoundedIcon
                  fontSize="large"
                  sx={{
                    color:
                      pathname === "/notifications"
                        ? activeStyle.color
                        : "#321F47",
                  }}
                />
              </Badge>
            )}

            {/* // TODO A REMETTRE EN PLACE LORSQUE NOTIF RECU */}
          </Button>
          <NavDesktop />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
