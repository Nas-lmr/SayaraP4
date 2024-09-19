import { useEffect } from "react";
import { useMap } from "react-leaflet";

// composont pour afficher les villes a et b
const FitBounds: React.FC<{
  coords1: [number, number] | null;
  coords2: [number, number] | null;
}> = ({ coords1, coords2 }) => {
  const map = useMap();

  useEffect(() => {
    if (coords1 && coords2) {
      map.fitBounds([coords1, coords2]);
    } else if (coords1) {
      map.setView(coords1, 18);
    } else if (coords2) {
      map.setView(coords2, 18);
    }
  }, [coords1, coords2, map]);

  return null;
};

export default FitBounds;
