import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

/* app.use("/api/anime", animeRoutes);
  app.use("/api/song", songRoutes);
app.use("/api/auth", authRoutes); */

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening to http://localhost:${PORT}`);
});
