import { getProkeralaToken } from "../src/services/prokeralaAuth.js";

type ComputeBirthChartInput = {
    birthDate: string;
    birthTime: string;
    latitude: number;
    longitude: number;
};

export async function computeBirthChart(
    input: ComputeBirthChartInput
) {
    console.log("TOOL NODE CALLED ---------------- BIRTHCHART")
    try {
        const token = await getProkeralaToken();
        const datetime = `${input.birthDate}T${input.birthTime}:00+05:30`;
        const coordinates = `${input.latitude},${input.longitude}`;

        const url =
            `https://api.prokerala.com/v2/astrology/planet-position` +
            `?datetime=${encodeURIComponent(datetime)}` +
            `&coordinates=${encodeURIComponent(coordinates)}` +
            `&ayanamsa=1`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errText = await response.text().catch(() => "");
            console.error(`Prokerala API responded with status ${response.status}: ${errText}`);
            throw new Error(`Prokerala API request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        if (!data || data.status !== "ok") {
            console.error("Prokerala API Response status is not ok:", data);
            throw new Error(data?.error?.message || "Prokerala API Error");
        }

        const planets = data.data?.planet_position;
        if (!Array.isArray(planets)) {
            throw new Error("Invalid planet position data returned from Prokerala API");
        }

        const sun = planets.find(
            (planet: any) => planet.name === "Sun"
        );

        const moon = planets.find(
            (planet: any) => planet.name === "Moon"
        );

        const ascendant = planets.find(
            (planet: any) => planet.name === "Ascendant"
        );

        return {
            sunSign: sun?.rasi?.name,
            moonSign: moon?.rasi?.name,
            ascendant: ascendant?.rasi?.name,
        };
    } catch (error: any) {
        console.error("Birth chart computation failed:", error);
        throw new Error(`Birth chart calculation error: ${error.message || error}`);
    }
}