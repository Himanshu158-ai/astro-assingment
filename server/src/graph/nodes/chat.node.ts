import type { AgentStateType } from "../state.js";
import { mistralChat } from "../../config/llm.models.js"

export async function chatNode(state: AgentStateType) {

  console.log("CHATNODE");
  console.log(JSON.stringify(state, null, 2))

const prompt = `
You are Aradhana AI, an astrology assistant.

RULES:
- Astrology is for self-reflection and guidance.
- Never provide medical, legal, or financial advice.
- Keep responses concise (150-250 words).
- Use bullet points.
- Be friendly and conversational.
- Avoid long essays.
- Answer only what the user asked.
- If birth chart data exists, ALWAYS use it.
- Never say "birth chart not provided" when chart data exists.
- Never ask for birth details when chart data exists.
- Use the provided chart data in your answer.

Birth Chart:
${state.birthChart ? JSON.stringify(state.birthChart) : "No need it because knowledge node has all the details."}

Knowledge:
${state.knowledge ? state.knowledge : "No need it because no need to mention about it."}

User Question:
${state.message}
`;

  const response = await mistralChat.invoke(prompt);
  if(!response)
  {
    return {
      error: "No response from AI",
    }
  }

  const content =
    typeof response.content === "string"
      ? response.content
      : response.content
        .map((c: any) => ("text" in c ? c.text : ""))
        .join("");

  return {
    response: content.trim(),
  };
}