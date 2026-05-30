import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import testing from "./routes/testing.route.js"



const app = express();

// app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/testing", testing)

connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});