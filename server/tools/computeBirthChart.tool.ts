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

    const data = await response.json();
    

    if (data.status !== "ok") {
        console.log(data);
        throw new Error("Prokerala API Error");
    }

    const planets = data.data.planet_position;


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
}