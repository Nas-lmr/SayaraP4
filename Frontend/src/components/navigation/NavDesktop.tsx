import { AccountCircle, ExpandLess, ExpandMore } from "@mui/icons-material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuDesktop from "./MenuDesktop";

export default function NavDesktop() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const openProfile = Boolean(anchorEl);
  return (
    <Box
      sx={{
        width: "40%",
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "1rem",
      }}
    >
      <NavLink
        to="/trajet/nouveau-trajet"
        style={{ width: "9.5rem", textDecoration: "none" }}
      >
        <Typography
          sx={{
            color: "#321F47",
            display: "flex",
            alignItems: "center",
            width: { md: "100%", lg: "100%" },
            justifyContent: "space-around",
            fontFamily: "Montserrat",
            fontWeight: 500,
          }}
        >
          <AddCircleOutlineRoundedIcon />
          Créer un trajet
        </Typography>
      </NavLink>
      <IconButton
        onClick={handleClickProfile}
        aria-label="profile"
        edge="start"
        sx={{
          pr: 0,
          height: "3rem",
          width: "5rem",
          // display: isLargeScreen || isMediumScreen ? "none" : "",
          display: { xs: "none", md: "flex" },
        }}
      >
        <AccountCircle fontSize="large" sx={{ color: "#321F47" }} />
        {openProfile ? (
          <ExpandLess sx={{ color: "#321F47" }} />
        ) : (
          <ExpandMore sx={{ color: "#321F47" }} />
        )}
      </IconButton>
      <MenuDesktop
        isOpen={openProfile}
        anchorEl={anchorEl}
        onClose={handleCloseProfile}
      />
    </Box>
  );
}
