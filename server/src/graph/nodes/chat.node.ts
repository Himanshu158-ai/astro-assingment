import type { AgentStateType } from "../state.js";

export async function chatNode(state: AgentStateType) {
  return {
    response: "Hello from AstroAgent",
  };
}