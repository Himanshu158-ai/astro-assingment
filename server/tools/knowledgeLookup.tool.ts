import { signKnowledge } from "../src/knowledge/signs.js";

export async function knowledgeLookup(sign: string) {
  console.log("TOOL NODE CALLED ---------------- KNOWLEDGE")
  const answer =
    signKnowledge[sign as keyof typeof signKnowledge];

    return {
        sign,
        answer: answer ?? "Knowledge not found",
    };
}