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
    const { userId, role, content } = req.body;

    const chat = await Chat.findOne({ userId });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const result = await astroGraph.invoke({
      message: content
    });

    console.log(result);

    if (result) {
      chat.messages.push({
        role,
        content: result.message,
        timestamp: new Date(),
      });

      chat.messages.push({
        role:"assistant",
        content: result.response,
        timestamp: new Date(),
      });
    }

    await chat.save();

    res.status(200).json({
      success: true,
      response: "done",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Failed to save message",
    });
  }
};