import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import TrajetSnackbar from "../trajet/TrajetSnackbar";

interface ILogoutCard {
  open: boolean;
  onClose: () => void;
}

export default function LogoutCard({ open, onClose }: ILogoutCard) {
  const { logout, userData } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">(
    "success"
  );

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (userData) {
      try {
        setLoading(true);
        await logout();
        setLoading(false);
        setSnackMessage("Déconnexion réussie !");
        setSnackSeverity("success");
        setSnackOpen(true);

        onClose();
        navigate("/");
      } catch (error) {
        setLoading(false);
        setSnackMessage("Erreur de déconnexion !");
        setSnackSeverity("error");
        setSnackOpen(true);
        console.error("Erreur de déconnexion:", error);
      }
    }
  };

  // Fonction pour fermer le snackbar
  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Es-tu sûr de vouloir te déconnecter ?</DialogTitle>
        <DialogActions>
          <Button
            onClick={onClose}
            sx={{ fontFamily: "Montserrat", color: "#321F47", fontWeight: 500 }}
          >
            Non
          </Button>
          <Button
            onClick={handleLogout}
            variant="contained"
            autoFocus={true}
            sx={{
              fontFamily: "Montserrat",
              color: "#FDC55E",
              fontWeight: 500,
              backgroundColor: "#321F47",
            }}
          >
            {loading ? (
              <CircularProgress sx={{ color: "#FDC55E" }} size={20} />
            ) : (
              "Oui"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Intégration du snackbar avec les props appropriées */}
      <TrajetSnackbar
        snackOpen={snackOpen}
        message={snackMessage}
        onClose={handleSnackClose}
        severity={snackSeverity}
      />
    </>
  );
}
