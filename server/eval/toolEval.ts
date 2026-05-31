import { geocodePlace } from "../src/tools/geocode.tool.js";
import { computeBirthChart } from "../src/tools/computeBirthChart.tool.js";
import { knowledgeLookup } from "../src/tools/knowledgeLookup.tool.js";

async function testGeocode() {
    console.log("\n=== GEOCODE TEST ===");
    const result = await geocodePlace(
        "Ludhiana, Punjab, India"
    );

    if (
        result &&
        typeof result.lat === "number" &&
        typeof result.lng === "number"
    ) {
        console.log("PASS");
        console.log(result);
    } else {
        console.log("FAIL");
        console.log(result);
    }

    console.log("\n=== BIRTH CHART TEST ===");

    try {
        const chart = await computeBirthChart({
            birthDate: "2003-06-12",
            birthTime: "10:30",
            latitude: 30.901,
            longitude: 75.857,
        });

        const passed =
            chart?.sunSign &&
            chart?.moonSign &&
            chart?.ascendant;

        if (passed) {
            console.log("PASS");
            console.log(chart);
        } else {
            console.log("FAIL");
            console.log(chart);
        }
    } catch (error) {
        console.log(error);
    }


    console.log("\n=== KNOWLEDGE TEST ===");


    const reslt = await knowledgeLookup(
        "Tula"
    );

    if (
        reslt?.answer &&
        reslt.answer.length > 0
    ) {
        console.log("PASS");
        console.log(reslt.answer);
    } else {
        console.log("FAIL");
        console.log(reslt);
    }

}

testGeocode();