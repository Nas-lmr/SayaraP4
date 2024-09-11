import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import FitBounds from "../../components/map/FitBounds";
import { getCoords,getRoute } from "../../utils";

type Coordinates = [number, number];

const RoadMap:React.FC = () => {
  const location = useLocation();
  const { villeDepart, villeArrive,dateDepart, heureDisponible } = location.state || {};


  const [coords1, setCoords1] = useState<Coordinates | null>(null);
  const [coords2, setCoords2] = useState<Coordinates | null>(null);
  const [route, setRoute] = useState<Coordinates[]>([]);

  useEffect(() => {
    const fetchCoordinatesAndRoute = async () => {
      try {
        if (villeDepart && villeArrive) {
          const coordinates1 = await getCoords(villeDepart);
          const coordinates2 = await getCoords(villeArrive);

          if (coordinates1) setCoords1(coordinates1);
          if (coordinates2) setCoords2(coordinates2);

          if (coordinates1 && coordinates2) {
            const fetchedRoute = await getRoute(coordinates1, coordinates2);
            setRoute(fetchedRoute);
          }
        }
      } catch (err) {
        console.error("Error fetching the route data", err);
      }
    };

    fetchCoordinatesAndRoute();
  }, [villeDepart, villeArrive,dateDepart,heureDisponible]);

  // const formattedDateDepart = dateDepart instanceof Date ? dateDepart.toLocaleDateString() : dateDepart;
  // const formattedHeureDisponible = heureDisponible instanceof Date ? heureDisponible.toLocaleTimeString() : heureDisponible;
  return (
    <>
    <div>
      <MapContainer
        style={{ height: "25rem", width: "auto" , marginTop:"30%"}}
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

     
    </div>
  
    </>
  );
};

export default RoadMap;
