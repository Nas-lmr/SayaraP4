import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import SearchDrawer from "../drawers/SearchDrawer";

export default function Searchbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: "1.8rem", fontFamily: "Montserrat", fontWeight: 600 }}
        >
          Trouves ton trajet idéal !
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "5vh",
          display: "flex",
          justifyContent: "center",
          pl: "1rem",
          pr: "1rem",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<SearchRoundedIcon sx={{ color: "#321F47" }} />}
          sx={{
            height: "100%",
            width: "80%",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "flex-start",
            borderRight: "none",
            borderRadius: "0.5rem 0 0 0.5rem",
            borderColor: "rgb(50,31,71,30%)",
          }}
          onClick={handleOpenDrawer}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "flex-start",
              width: "100%",
            }}
          >
            <Typography
              textAlign="start"
              alignContent="center"
              sx={{
                fontSize: "0.8rem",
                color: "#321F47",
                fontFamily: "Montserrat",
                fontWeight: 500,
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              Paris
              <span>
                <ArrowRightAltRoundedIcon
                  fontSize="small"
                  sx={{ pt: "0.2rem" }}
                />
              </span>
              Marseille
            </Typography>
            <Typography
              textAlign="start"
              sx={{
                fontSize: "0.8rem",
                color: "#321F47",
                fontFamily: "Montserrat",
                fontWeight: 500,
              }}
            >
              24/02/2024
            </Typography>
          </Box>
        </Button>
        <Button
          variant="outlined"
          sx={{
            height: "100%",
            width: "20%",
            backgroundColor: "white",
            borderLeft: "none",
            borderRadius: " 0 0.5rem 0.5rem 0",
            borderColor: "rgb(50,31,71,30%)",
          }}
        >
          <TuneRoundedIcon sx={{ color: "#321F47" }} />
        </Button>
        <SearchDrawer isOpen={isDrawerOpen} onclose={handleCloseDrawer} />
      </Box>
    </>
  );
}
