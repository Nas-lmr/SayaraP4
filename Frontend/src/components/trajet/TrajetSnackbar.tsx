import { Alert, Snackbar } from "@mui/material";
import { ISnackbar } from "../../interfaces/components/ISnackbar";

export default function TrajetSnackbar({
  snackOpen,
  message,
  onClose,
  severity,
}: ISnackbar) {
  console.log("Snackbar Props:", { open, message, severity });
  return (
    <Snackbar
      open={snackOpen}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        variant="filled"
        onClose={onClose}
        severity={severity}
        sx={{
          width: "100%",
          height: "8vh",
          fontFamily: "Montserrat",
          color: "white",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
