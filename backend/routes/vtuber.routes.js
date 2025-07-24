import express from "express";
import {
  createVtuber,
  getVtubers,
  getVtuberById,
  updateVtuber,
  deleteVtuber,
  createSongForVtuber,
  getSongByIdForVtuber,
  updateSongForVtuber,
  deleteSongForVtuber,
} from "../controllers/vtuber.controller.js";

const router = express.Router();

router.post("/", createVtuber);
router.get("/", getVtubers);

router.get("/:id", getVtuberById);
router.put("/:id", updateVtuber);
router.delete("/:id", deleteVtuber);

router.post("/:id/song", createSongForVtuber);

router.get("/:id/song/:songId", getSongByIdForVtuber);
router.put("/:id/song/:songId", updateSongForVtuber);
router.delete("/:id/song/:songId", deleteSongForVtuber);

export default router;