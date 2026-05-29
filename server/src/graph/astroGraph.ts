import { StateGraph, START, END, type CompiledStateGraph } from "@langchain/langgraph";
import { AgentState } from "./state.js";
import { chatNode } from "./nodes/chat.node.js";

export const astroGraph: CompiledStateGraph<any, any, any> = new StateGraph(AgentState)
  .addNode("chatNode", chatNode)
  .addEdge(START, "chatNode")
  .addEdge("chatNode", END)
  .compile();
