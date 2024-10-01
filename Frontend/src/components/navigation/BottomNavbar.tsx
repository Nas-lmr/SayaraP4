import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

export default function BottomNavbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const activeStyle = {
    backgroundColor: "#321F47",
    color: "#FDC55E",
    borderRadius: "0 0 0.5rem 0.5rem",
    height: "90%",
    pl: "1rem",
    pr: "1rem",
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "3.5rem",
        position: "fixed",
        bottom: 0,
        display: { md: "none" },
      }}
    >
      <BottomNavigation
        showLabels
        sx={{
          backgroundColor: "#7FC3D1",
          height: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <BottomNavigationAction
          component={NavLink}
          to="/"
          label={
            <span style={{ fontFamily: "Montserrat", fontWeight: 500 }}>
              Accueil
            </span>
          }
          icon={<HomeRoundedIcon fontSize="large" />}
          sx={{
            minWidth: 50,
            maxWidth: 70,
            color: pathname === "/" ? activeStyle.color : "#321F47",
            backgroundColor:
              pathname === "/" ? activeStyle.backgroundColor : "",
            borderRadius: pathname === "/" ? activeStyle.borderRadius : "",
            height: pathname === "/" ? activeStyle.height : "100%",
          }}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/trajet"
          label={
            <span style={{ fontFamily: "Montserrat", fontWeight: 500 }}>
              Trajets
            </span>
          }
          icon={<CalendarMonthRoundedIcon fontSize="large" />}
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 500,
            minWidth: 50,
            maxWidth: 70,
            color:
              pathname === "/trajet" ||
              pathname === "/trajet/resultats" ||
              pathname === "/trajet/nouveau-trajet"
                ? activeStyle.color
                : "#321F47",
            backgroundColor:
              pathname === "/trajet" ||
              pathname === "/trajet/resultats" ||
              pathname === "/trajet/nouveau-trajet"
                ? activeStyle.backgroundColor
                : "",
            borderRadius:
              pathname === "/trajet" ||
              pathname === "/trajet/resultats" ||
              pathname === "/trajet/nouveau-trajet"
                ? activeStyle.borderRadius
                : "",
            height:
              pathname === "/trajet" ||
              pathname === "/trajet/resultats" ||
              pathname === "/trajet/nouveau-trajet"
                ? activeStyle.height
                : "100%",
          }}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/messagerie"
          label={
            <span style={{ fontFamily: "Montserrat", fontWeight: 500 }}>
              Messages
            </span>
          }
          icon={
            <Badge
              variant="dot"
              overlap="circular"
              color="error"
              badgeContent={0}
              invisible={pathname === "/messagerie"}
            >
              <SmsRoundedIcon fontSize="large" />
            </Badge>
          }
          sx={{
            minWidth: 50,
            maxWidth: 70,
            color: pathname === "/messagerie" ? activeStyle.color : "#321F47",
            backgroundColor:
              pathname === "/messagerie" ? activeStyle.backgroundColor : "",
            borderRadius:
              pathname === "/messagerie" ? activeStyle.borderRadius : "",
            height: pathname === "/messagerie" ? activeStyle.height : "100%",
          }}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/profil"
          label={
            <span style={{ fontFamily: "Montserrat", fontWeight: 500 }}>
              Profil
            </span>
          }
          icon={<PersonRoundedIcon fontSize="large" />}
          sx={{
            minWidth: 50,
            maxWidth: 70,
            color:
              pathname === "/profil" ||
              pathname === "/login" ||
              pathname === "/register"
                ? activeStyle.color
                : "#321F47",
            backgroundColor:
              pathname === "/profil" ||
              pathname === "/login" ||
              pathname === "/register"
                ? activeStyle.backgroundColor
                : "",
            borderRadius:
              pathname === "/profil" ||
              pathname === "/login" ||
              pathname === "/register"
                ? activeStyle.borderRadius
                : "",
            height:
              pathname === "/profil" ||
              pathname === "/login" ||
              pathname === "/register"
                ? activeStyle.height
                : "100%",
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
