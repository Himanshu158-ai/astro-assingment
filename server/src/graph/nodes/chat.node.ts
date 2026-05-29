import type { AgentStateType } from "../state.js";
import { mistralChat } from "../../config/llm.models.js"

export async function chatNode(state: AgentStateType) {
  console.log("DEBUG: Chat Node Input Messages:", state.message);
  const prompt = `just give the proffesional answer of the users question ${state.message}`;

  const response = await mistralChat.invoke(prompt);

  // Extract text from response
  const textResponse = typeof response.content === "string"
    ? response.content
    : JSON.stringify(response.content);

  console.log("DEBUG: Chat Node Response:", textResponse);

  return {
    response: textResponse
  };
}
