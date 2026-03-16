import express from "express";
import {
  createVtuber,
  getVtubers,
  getVtuberById,
  updateVtuber,
  deleteVtuber,
  proxyImage,
  createSongForVtuber,
  getSongByIdForVtuber,
  updateSongForVtuber,
  deleteSongForVtuber,
  updateProfilePicture,
} from "../controllers/vtuber.controller.js";

const router = express.Router();

router.post("/", createVtuber);
router.get("/", getVtubers);

router.post("/song", createSongForVtuber);

router.get("/:id", getVtuberById);
router.put("/:id", updateVtuber);
router.delete("/:id", deleteVtuber);

router.get("/:id/song/:songId", getSongByIdForVtuber);
router.put("/:id/song/:songId", updateSongForVtuber);
router.delete("/:id/song/:songId", deleteSongForVtuber);

router.get("/proxy-image/:encodedUrl", proxyImage);
router.get("/update-profile-picture/:id", updateProfilePicture);

export default router;
