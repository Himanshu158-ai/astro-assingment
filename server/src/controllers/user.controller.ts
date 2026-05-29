import User from "../models/user.js";
import Chat from "../models/chat.js"


export const createUser = async (req: any, res: any) => {
  try {
    const user = await User.create(req.body);

    await Chat.create({
      userId: user._id,
      messages: [],
    });

    res.status(201).json({
      success: true,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};