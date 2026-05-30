import Chat from "../models/chat.js";
import { astroGraph } from "../graph/astroGraph.js";

export const chatHistory = async (req: any, res: any) => {
  try {
    const chat = await Chat.findOne({
      userId: req.params.userId,
    });

    res.status(200).json({
      success: true,
      messages: chat?.messages || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch chat",
    });
  }
};

export const addMessage = async (req: any, res: any) => {
  try {
    const { userId, role } = req.body;
    const userMessageContent = req.body.content || req.body.message;
    const chat = await Chat.findOne({ userId });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const result = await astroGraph.invoke({
      userId,
      message: userMessageContent
    });

    if (!result.response) {
      throw new Error("Response is undefined");
    }

    chat.messages.push({
      role: role || "user",
      content: userMessageContent,
      timestamp: new Date(),
    });

    chat.messages.push({
      role: "assistant",
      content: result.response,
      timestamp: new Date(),
    });

    await chat.save();
    console.log("DONE");

    res.status(200).json({
      success: true,
      response: result.response,
    });
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};