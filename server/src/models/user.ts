import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    birthDate: {
      type: String,
      required: true,
    },

    birthTime: {
      type: String,
      required: true,
    },

    birthPlace: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);