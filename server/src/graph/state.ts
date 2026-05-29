import { Annotation } from "@langchain/langgraph";

export const AgentState = Annotation.Root({
  message: Annotation<string>(),
  response: Annotation<string>(),
});

export type AgentStateType = typeof AgentState.State;