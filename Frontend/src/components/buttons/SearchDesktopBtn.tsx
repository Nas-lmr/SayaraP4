import { Button } from "@mui/material";

export default function SearchDesktopBtn() {
  return (
    <Button
      sx={{
        height: "100%",
        width: "15%",
        borderRadius: "0 1rem 1rem 0",
        backgroundColor: "#321F47",
        color: "#FDC55E",
        fontFamily: "Montserrat",
        fontWeight: 500,
      }}
    >
      Rechercher
    </Button>
  );
}
