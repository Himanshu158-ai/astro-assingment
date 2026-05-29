import express from "express";
import { addMessage, chatHistory } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/:userId", chatHistory);
router.post("/message", addMessage)

export default router;