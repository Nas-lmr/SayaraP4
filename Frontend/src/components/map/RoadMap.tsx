import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import { useLocation } from "react-router-dom";
import { IRoadMap } from "../../interfaces/components/IRoadMap";
import {  getRoute } from "../../utils";
import { fetchAndSaveCity } from "../../services/ville/VilleService";
import FitBounds from "./FitBounds";

type Coordinates = [number, number];

const RoadMap: React.FC<IRoadMap> = ({ onRouteData }) => {
  const location = useLocation();
  const { villeDepart, villeArrive, dateDepart, heureDisponible } =
    location.state || {};

  const [coords1, setCoords1] = useState<Coordinates | null>(null);
  const [coords2, setCoords2] = useState<Coordinates | null>(null);
  const [route, setRoute] = useState<Coordinates[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const fetchCoordinatesAndRoute = async () => {
      try {
        let coordinates1: Coordinates | null = null;
        let coordinates2: Coordinates | null = null;
        if (villeDepart ) {
          const VilleD = await fetchAndSaveCity(villeDepart);
          if (VilleD) {
            coordinates1 = VilleD.coordinates;
            setCoords1(coordinates1)
          }}
          // const coordinates1 = await getCoords(villeDepart);
          // const coordinates2 = await getCoords(villeArrive);

          // if (coordinates1) setCoords1(coordinates1);
          // if (coordinates2) setCoords2(coordinates2);

          // if (coordinates1 && coordinates2) {
          //   const { routeCoordinate, distance, duration } = await getRoute(
          //     coordinates1,
          //     coordinates2
          //   );
          //   setRoute(routeCoordinate);
          //   setDistance(distance); // distance in meters
          //   setDuration(duration); // duration in seconds

          //   onRouteData(distance, duration);

          if(villeArrive){
            const VilleA = await fetchAndSaveCity(villeArrive)
            if(VilleA){
              coordinates2 = VilleA.coordinates
              setCoords2(coordinates2)
            }
          }
          if (coordinates1 && coordinates2) {
            const { routeCoordinate, distance, duration } = await getRoute(
              coordinates1,
              coordinates2
            );
            setRoute(routeCoordinate);
            setDistance(distance); // distance in meters
            setDuration(duration); // duration in seconds

            onRouteData(distance, duration);
       
        }
      } catch (err) {
        console.error("Error fetching the route data", err);
      }
    };

    fetchCoordinatesAndRoute();
  }, [
    villeDepart,
    villeArrive,
    dateDepart,
    heureDisponible,
    distance,
    duration,
    onRouteData,
  ]);

  return (
    <MapContainer
      style={{
        height: "100%",
        width: "100%",
        border: "1px solid rgba(50, 31, 71, 0.2)",
        borderRadius: "0.5rem",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Marker for the first city */}
      {coords1 && (
        <Marker position={coords1}>
          <Popup>
            {villeDepart ? `City: ${villeDepart}` : `Coordinates: ${coords1}`}
          </Popup>
        </Marker>
      )}

      {/* Marker for the second city */}
      {coords2 && (
        <Marker position={coords2}>
          <Popup>
            {villeArrive ? `City: ${villeArrive}` : `Coordinates: ${coords2}`}
          </Popup>
        </Marker>
      )}

      {/* Polyline to connect the two cities following roads */}
      {route.length > 0 && (
        <Polyline positions={route} pathOptions={{ color: "blue" }} />
      )}

      {/* Component to adjust map view to fit markers */}
      <FitBounds coords1={coords1} coords2={coords2} />
    </MapContainer>
  );
};

export default RoadMap;
