import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { IValidationTrajet } from "../../interfaces/services/IPostTrajet";
import { usePostTrajet } from "../../services/trajet/trajetService";
import TrajetSnackbar from "./TrajetSnackbar";

export default function ValidationTrajet({
  open,
  onClose,
  trajetData,
  onSuccess,
  onError,
}: IValidationTrajet) {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { decodedToken } = useUserContext();
  const navigate = useNavigate();
  const postTrajet = usePostTrajet();

  const handleConfirm = async () => {
    if (decodedToken?.id) {
      setLoading(true);
      setError(null);
      try {
        await postTrajet({ ...trajetData });

        setIsSuccess(true);
        onSuccess?.();
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (error) {
        setIsSuccess(false);
        const errorMessage =
          "Erreur lors de la création du trajet. Veuillez réessayer.";
        setError(errorMessage);
        onError?.(errorMessage);
        console.error("Erreur lors de la création du trajet", error);
      } finally {
        setLoading(false);
        onClose();
      }
    } else {
      const errorMessage = "User ID non trouvé.";
      setError(errorMessage);
      onError?.(errorMessage);
      console.error("User ID non trouvé");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle
          sx={{
            fontFamily: "Montserrat",
            color: "#321F47",
            fontWeight: 600,
          }}
        >
          Es-tu sûr de vouloir créer ce trajet ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontFamily: "Montserrat",
              color: "#321F47",
              fontWeight: 400,
            }}
          >
            Une fois ce trajet créé, il sera visible par les passagers
            potentiels et tu ne pourras plus le modifier. Assure-toi que toutes
            les informations sont correctes avant de confirmer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            sx={{ fontFamily: "Montserrat", color: "#321F47", fontWeight: 500 }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirm}
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
              "En avant !"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      <TrajetSnackbar
        snackOpen={Boolean(error) || isSuccess}
        message={error || "Trajet créé avec succès!"}
        onClose={() => {
          setError(null);
          setIsSuccess(false);
        }}
        severity={error ? "error" : "success"}
      />
    </>
  );
}
