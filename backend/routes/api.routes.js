import express from "express";
import vtuberRoutes from "./vtuber.routes.js";
import { getApiContent } from "../controllers/api.controller.js";

const router = express.Router();

router.get("/", getApiContent)
router.use("/vtuber", vtuberRoutes);

export default router;
