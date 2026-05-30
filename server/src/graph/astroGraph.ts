import { StateGraph, START, END, type CompiledStateGraph } from "@langchain/langgraph";
import { AgentState } from "./state.js";
import { chatNode } from "./nodes/chat.node.js";
import { toolNode } from "./nodes/tool.node.js";
import { routerNode } from "./nodes/router.node.js";

export const astroGraph: CompiledStateGraph<any, any, any> = new StateGraph(AgentState)
  .addNode("chatNode", chatNode)
  .addNode("toolNode", toolNode)
  .addNode("routerNode", routerNode)

  .addEdge(START, "routerNode")
  .addConditionalEdges(
    "routerNode",
    (state) => state.intent === "chat" || state.intent === "daily_transits"
      ? "chatNode"
      : "toolNode"
  )
  .addEdge("toolNode", "chatNode")
  .addEdge("chatNode", END)
  .compile();
