import User from "../models/user.js";


export const createUser = async (req:any, res:any) => {
  try {
    const user = await User.create(req.body);

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