import { signKnowledge } from "../src/knowledge/signs.js";

export async function knowledgeLookup(sign: string) {
  const answer =
    signKnowledge[sign as keyof typeof signKnowledge];

    return {
        sign,
        answer: answer ?? "Knowledge not found",
    };
}