import { Annotation } from "@langchain/langgraph";

export const AgentState = Annotation.Root({
  userId: Annotation<string>(),
  messages: Annotation<
    {
      role: "user" | "assistant";
      content: string;
    }[]
  >(),
  response: Annotation<string | undefined>(),
});

export type AgentStateType = typeof AgentState.State;