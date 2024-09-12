import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Box, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SelectPassengers from "./SelectPassengers";
// import { IPassenger } from "../../interfaces/components/IPassenger";

export default function PassengerSearchbar() {
  // {passenger,setPassenger}:IPassenger
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [numberPassenger, setNumberPassenger] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <Box sx={{ width: "20%", height: "100%" }} ref={ref}>
      <Button
        disableRipple
        onClick={toggleSelect}
        startIcon={<PersonRoundedIcon sx={{ color: "#321F47" }} />}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderRadius: " 0 ",
          backgroundColor: "white",
          borderColor: "rgba(50, 31, 71, 0.5)",
          width: "100%",
          height: "100%",
          fontFamily: "Montserrat",
          color: "#321F47",
          textTransform: "none",
          "&::before": {
            content: '""',
            position: "absolute",
            left: "0",
            top: "20%",
            height: "60%",
            width: "1px",
            backgroundColor: "rgba(50, 31, 71, 0.5)",
          },
        }}
      >
        {numberPassenger} {numberPassenger > 1 ? "Passagers" : "Passager"}
        {isSelectOpen && (
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              zIndex: 1,
            }}
          >
            <SelectPassengers
              numberPassenger={numberPassenger}
              setNumberPassenger={setNumberPassenger}
              // VERSION A GARDER UNE FOIS QUE LE FETCH SERA EFFECTUÉ DANS LE COMPOSANT PARENT
              // numberPassenger={passenger}
              // setNumberPassenger={setPassenger}
            />
          </Box>
        )}
      </Button>
    </Box>
  );
}
