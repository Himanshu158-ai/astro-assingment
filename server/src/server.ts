import express from "express";
// import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

// app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});