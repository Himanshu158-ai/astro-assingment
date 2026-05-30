import type { AgentStateType } from "../state.js"
import { cohereChat } from "../../config/llm.models.js";

export async function routerNode(state: AgentStateType) {

    console.log("ROUTERNODE");

    let intent = "chat";
    
    const prompt = `
Classify the user's intent.

Possible intents:
1. birth_chart
2. knowledge_lookup
3. chat

User Message:
${state.message}

Return only the intent.
`;

    const response = await cohereChat.invoke(prompt);

    const content =
      typeof response.content === "string"
        ? response.content
        : response.content
          .map((c: any) => ("text" in c ? c.text : ""))
          .join("");

    const result = content.trim().toLowerCase();

    if (result === "birth_chart") intent = "birth_chart";
    if (result === "knowledge_lookup") intent = "knowledge_lookup";

    return { intent };
}