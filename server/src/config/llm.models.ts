import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import * as dotenv from "dotenv";
dotenv.config();


export const mistralChat = new ChatMistralAI({
    model:"mistral-medium-latest",
    apiKey:process.env.MISTRAL_API_KEY!,
})

export const cohereChat = new ChatCohere({
    model:"command-a-03-2025",
    apiKey:process.env.COHERE_API_KEY!
})