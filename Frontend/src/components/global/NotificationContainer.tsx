import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { fetchUserNotification } from "../../services/user/NotificationService";
import NotificationCard from "../cards/NotificationCard";
interface NotificationInterface {
  seen: boolean;
}

export default function NotificationContainer() {
  const [content, setContent] = useState<NotificationInterface[]>([]); // Les données de notification
  const [error, setError] = useState<string | null>(null); // Les erreurs éventuelles
  const [loading, setLoading] = useState<boolean>(true); // Pour gérer le chargement des données
  const { decodedToken } = useUserContext();
  const ownerId = decodedToken?.id;

  // Fetch des notifications lors du montage du composant
  useEffect(() => {
    if (ownerId) {
      fetchUserNotification(ownerId)
        .then((response) => {
          if (response.success) {
            setContent(response.data); // Stocke les notifications dans l'état
          } else {
            setError(response.error); // Enregistre l'erreur si la requête échoue
          }
        })
        .catch((err) => {
          console.error(err);
          setError(
            "Une erreur s'est produite lors de la récupération des notifications."
          );
        })
        .finally(() => {
          setLoading(false); // Quoi qu'il arrive, on arrête le chargement
        });
    }
  }, [ownerId]);

  // Log pour vérifier les données
  const unreadNotifications = content.filter(
    (notification) => !notification.seen
  );

  return (
    <Box sx={{ height: "100%", width: "90%", pt: "1rem" }}>
      <Typography
        variant="h1"
        textAlign="center"
        sx={{
          color: "#FDC55E",
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: "1.7rem",
        }}
      >
        Centre de notifications
      </Typography>

      {/* Gestion du chargement */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: "2rem",
          }}
        >
          <CircularProgress size={50} />
        </Box>
      ) : (
        <Box
          sx={{
            height: "95%",
            width: "100%",
            pt: "2rem",
            pb: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            overflowY: "auto",
          }}
        >
          {/* Affichage des notifications ou d'un message d'erreur */}
          {error ? (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          ) : unreadNotifications.length > 0 ? (
            unreadNotifications.map((informations, index) => (
              <NotificationCard key={index} informations={informations} />
            ))
          ) : (
            <Typography textAlign="center">
              Aucune notification pour l'instant.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
