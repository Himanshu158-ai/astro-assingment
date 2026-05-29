import { ChatMistralAI } from "@langchain/mistralai";
import * as dotenv from "dotenv";
dotenv.config();


export const mistralChat = new ChatMistralAI({
    model:"mistral-medium-latest",
    apiKey:process.env.MISTRAL_API_KEY!,
})