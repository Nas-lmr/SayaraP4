import axios from "axios";




export const verifyUrlNotNull = (url: string) => url !== '' && url !== null && url !== undefined;
/**
 * This method does it call in first step before rendering component with useEffect((), [])
 */
export const isAuthenticated = () => {
  window.addEventListener('storage',() => {
    if(localStorage.user === null || localStorage.user === undefined) {
      window.location.href = '/accueil';
    }
  })
};



/*  */




type Coordinates = [number, number];
// Function to get the coordinates of the city
export const getCoords = async (city: string): Promise <Coordinates | null> => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`);
    const data = await response.json();
  
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return [parseFloat(lat), parseFloat(lon)];
    }
  
    return null;
  };




  // Function to get the road-based route between two coordinates using OpenRouteService
export const getRoute = async (coords1: [number, number], coords2: [number, number]) => {
    const apiKey = '5b3ce3597851110001cf624841a65af76d114ff9be722fcb652ab2aa'; 
    const response = await axios.get(
      `https://api.openrouteservice.org/v2/directions/driving-car`,
      {
        params: {
          api_key: apiKey,
          start: `${coords1[1]},${coords1[0]}`, // longitude,latitude
          end: `${coords2[1]},${coords2[0]}`,   // longitude,latitude
        },
      }
    );
  
    const routeData = response.data.features[0].geometry.coordinates;
    // Convert the coordinates to the format Leaflet Polyline expects (lat, lon)
    return routeData.map((coord: number[]) => [coord[1], coord[0]]);
  };

  
