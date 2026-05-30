import type { AgentStateType } from "../state.js"
import User from "../../models/user.js";
import { geocodePlace } from "../../../tools/geocode.tool.js";
import { computeBirthChart } from "../../../tools/computeBirthChart.tool.js";
import { knowledgeLookup } from "../../../tools/knowledgeLookup.tool.js";

export async function toolNode(state: AgentStateType) {
  console.log("TOOLNODE");
  console.log(state.intent);

  try {
    const user = await User.findById(state.userId);
    console.log(user);

    if (!user) {
      return {
        error: "User not found",
      }
    }

    const coords = await geocodePlace(
      user.birthPlace
    );

    if (!coords) {
      return {
        error: `Could not find coordinates for birth place: ${user.birthPlace}`,
      }
    }

    const chart = await computeBirthChart({
      birthDate: user.birthDate,
      birthTime: user.birthTime,
      latitude: coords.lat,
      longitude: coords.lng,
    });
    console.log(chart);

    if (state.intent === "birth_chart") {
      return {
        birthChart: chart,
      };
    }

    if (state.intent === "knowledge_lookup") {
      const knowledge = await knowledgeLookup(
        chart.ascendant
      );

      return {
        birthChart: chart,
        knowledge: knowledge.answer,
      };
    }
  } catch (error: any) {
    console.error("Error in toolNode:", error);
    return {
      error: error.message || String(error),
    };
  }

  return {};
}