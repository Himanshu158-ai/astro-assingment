import { signKnowledge } from "../src/knowledge/signs.js";
import type { RunnableConfig } from "@langchain/core/runnables";

export async function knowledgeLookup(sign: string | undefined, config?: RunnableConfig) {
  console.log("TOOL NODE CALLED ---------------- KNOWLEDGE")
  const send = config?.configurable?.send;
  send?.("status", "Looking up knowledge...");
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