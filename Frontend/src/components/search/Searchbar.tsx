import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { IResultContainer } from "../../interfaces/components/trajet/IResultContainer";
import SearchDrawer from "../drawers/SearchDrawer";

export default function Searchbar({ results }: IResultContainer) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const formatDate = (dateTime: string): string => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`; // Format DD/MM/YYYY
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "5vh",
          display: { xs: "flex", md: "none" },
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
              {results[0].departureCity.name}
              <span>
                <ArrowRightAltRoundedIcon
                  fontSize="small"
                  sx={{ pt: "0.2rem" }}
                />
              </span>
              {results[0].destinationCity.name}
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
              {formatDate(results[0].departureDateTime)}
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
