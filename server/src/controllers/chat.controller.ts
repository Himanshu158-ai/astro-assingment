import Chat from "../models/chat.js";

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

    chat.messages.push({
      role,
      content,
      timestamp: new Date(),
    });

    await chat.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save message",
    });
  }
};