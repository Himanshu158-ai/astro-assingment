import { Annotation } from "@langchain/langgraph";

export const AgentState = Annotation.Root({
  userId: Annotation<string>(),
  message: Annotation<string>(),
  response: Annotation<string>(),

  intent: Annotation<string>(),
  birthChart: Annotation<any>(),
  knowledge: Annotation<string>(),
});

export type AgentStateType = typeof AgentState.State;