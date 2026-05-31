import { signKnowledge } from "../knowledge/signs.js";

export async function knowledgeLookup(sign: string | undefined) {
  console.log("TOOL NODE CALLED ---------------- KNOWLEDGE")
  if (!sign) {
    return {
      sign: "",
      answer: "Knowledge not found (Ascendant sign is missing)",
    };
  }
  const answer =
    signKnowledge[sign as keyof typeof signKnowledge];

  return {
    sign,
    answer: answer ?? "Knowledge not found",
  };
}