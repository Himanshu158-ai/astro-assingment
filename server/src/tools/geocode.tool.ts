import axios from "axios";

interface Location {
  lat: number;
  lng: number;
}

export async function geocodePlace(location: string): Promise<Location | null> {
  const url = "https://nominatim.openstreetmap.org/search";

  try {
    const response = await axios.get(url, {
      params: {
        q: location,
        format: "json",
        limit: 1
      },
      headers: {
        "User-Agent": "AstroTask/1.0" 
      }
    });

    const data = response.data;

    if (!data || data.length === 0) return null;

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Geocoding failed for location:", location, error);
    return null;
  }
}
