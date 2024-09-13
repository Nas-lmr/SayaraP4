type Coordinates = [number, number];

// function to transform the POINT Coordinates to normal coordinates
const TransformPoint = (pointString: string): Coordinates | null => {
  if (!pointString) {
    return null;
  }
  const cleanCoords = pointString.replace("POINT(", "").replace(")", "").trim();
  const coordinates = cleanCoords.split(" ");
  if (coordinates.length !== 2) {
    return null;
  }

  const latitude = parseFloat(coordinates[0]);
  const longitude = parseFloat(coordinates[1]);

  return [latitude, longitude];
};

/* ****************************local database fetch**************************** */
/* 2 function that fetch the city in our database if not from external database then saves using theree method */

const fetchCity = async (
  cityName: string
): Promise<{ city: string; coordinates: Coordinates } | null> => {
  const normalizedCityName = cityName.toLowerCase();

  const response = await fetch(
    `http://localhost:3310/city/one?name=${normalizedCityName}`
  );
  const data = await response.json();

  if (data) {
    const { name, coordinates } = data;

    if (coordinates) {
      const parsedCoordinates = TransformPoint(coordinates);

      if (parsedCoordinates) {
        return {
          city: name,
          coordinates: parsedCoordinates,
        };
      } else {
        console.error("Invalid coordinates format.");
      }
    }
  }

  return null;
};

/*  2 ******************* service fetch city from external api if the city is not our database *************** */

// Function to fetch city coordinates from external API
export const getExternalApi = async (
  city: string
): Promise<Coordinates | null> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?city=${city}&format=json`
  );
  const data = await response.json();
  if (data && data.length > 0) {
    const { lat, lon } = data[0];
    return [parseFloat(lat), parseFloat(lon)];
  }

  return null;
};

/* ************************************ services to save city in database  ******************************/

// 3. Save the city to the local database (POST method)
const saveCity = async (
  cityName: string,
  coordinates: Coordinates
): Promise<void> => {
  const normalizedCityName = cityName.toLowerCase();
  const [lat, lon] = coordinates;

  const coordinateString = `${lat}, ${lon}`;

  const response = await fetch("http://localhost:3310/city", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: normalizedCityName,
      coordinate: coordinateString,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    console.info(`City ${cityName} saved successfully:`, data);
  } else {
    console.error("Failed to save city:", data);
  }
};

/***************************************************************MAIN FUNTION THAT FETCH LOCALY AND EXTERNAL API IN NEEDED AND SAVE LOCALY********************** */

// Main function to fetch and save a city
export const fetchAndSaveCity = async (
  cityName: string
): Promise<{
  city: string;
  coordinates: Coordinates;
} | null> => {
  const normalizedCityName = cityName.toLowerCase();

  let cityData = await fetchCity(normalizedCityName);

  if (cityData === null) {
    const coordinates = await getExternalApi(cityName);
    if (coordinates) {
      await saveCity(normalizedCityName, coordinates);
      cityData = {
        city: normalizedCityName,
        coordinates: coordinates,
      };
    } else {
      console.error("City not found in external API");
      return null;
    }
  }
  return cityData;
};
