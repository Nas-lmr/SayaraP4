import { Button } from "@mui/material";
import { useUserContext } from "../../context/UserContext"; // Assurez-vous que le chemin est correct

export default function ProfilSection() {
  const { logout } = useUserContext(); // Utiliser le hook pour obtenir la fonction logout

  const handleLogout = async () => {
    try {
      await logout(); // Appeler la fonction logout
    } catch (err) {
      console.error("An error occurred during logout:", err);
    }
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      LOGOUT
    </Button>
  );
}
