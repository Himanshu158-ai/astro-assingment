import axios from "axios";

interface Location {
  lat: number;
  lng: number;
}

export async function geocodePlace(location: string): Promise<Location | null> {
  console.log("TOOL NODE CALLED ---------------- GEOCODE")
  const url = "https://nominatim.openstreetmap.org/search";

  const response = await axios.get(url, {
    params: {
      q: location,
      format: "json",
      limit: 1
    },
    headers: {
      "User-Agent": "AstroTask/1.0"  // Nominatim requires this
    }
  });

  const data = response.data;

  if (data.length === 0) return null;

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
}
