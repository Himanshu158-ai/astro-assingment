import type { AgentStateType } from "../state.js";
import { mistralChat } from "../../config/llm.models.js"

export async function chatNode(state: AgentStateType) {

  console.log("CHATNODE");
  console.log(JSON.stringify(state, null, 2))

  if (state.error) {
    return {
      response: `I'm sorry, I couldn't retrieve the astrology data because: ${state.error}. Please check your birth details.`,
    };
  }
  if(state.intent==="daily_transits"){
    return{
      response: `Real-time transit analysis is not available in this version.`,
    }
  }

  const prompt = `
You are Aradhana AI, a specialized astrology assistant.

IMPORTANT RULES:

- You ONLY answer astrology-related questions.
- You ONLY discuss birth charts, zodiac signs, moon signs, ascendants, planetary influences, and self-reflection through astrology.
- If the user asks anything unrelated to astrology (sports, celebrities, coding, politics, history, movies, general knowledge, etc.), politely refuse and say:
  "I'm an astrology assistant and can only help with astrology-related questions."

- Astrology is for self-reflection and guidance only.
- Never provide medical advice.
- Never provide legal advice.
- Never provide financial advice.
- Never make guaranteed predictions about the future.

RESPONSE STYLE:

- Keep responses short and natural.
- Maximum 150 words.
- Prefer 2-4 short paragraphs.
- Do NOT use bullet points unless absolutely necessary.
- Do NOT use markdown.
- Do NOT use *, **, #, or any formatting symbols.
- Write like a friendly human conversation.
- Answer only what the user asked.
- Avoid long explanations.
- For greetings like "hi", "hello", "hey":
  Reply in 1-2 short sentences.

BIRTH CHART DATA:

${state.birthChart
      ? JSON.stringify(state.birthChart, null, 2)
      : "Not available"
    }

KNOWLEDGE:

${state.knowledge
      ? state.knowledge
      : "Not available"
    }

CONTEXT RULES:

- If birth chart data exists, ALWAYS use it.
- Never say birth chart data is missing when it exists.
- Never ask for birth details when chart data already exists.
- Use only the provided chart data and knowledge.
- Do not invent zodiac signs or chart information.

USER QUESTION:

${state.message}
`;

  try {
    const response = await mistralChat.invoke(prompt);
    if (!response) {
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
  } catch (error: any) {
    console.error("Mistral chat invocation failed:", error);
    return {
      response: "I'm sorry, I'm having trouble connecting to my astro-knowledge systems. Please try again in a moment.",
    };
  }
}