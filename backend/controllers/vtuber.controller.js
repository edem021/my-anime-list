import Vtuber from "../models/vtuber.model.js";
import Song from "../models/song.model.js";

export const createVtuber = async (req, res) => {
  try {
    const vtuber = await Vtuber.create(req.body);
    res.status(201).json(vtuber);
  } catch (error) {
    res.status(500).json({ message: "Error creating vtuber" });
  }
};

export const getVtubers = async (req, res) => {
  try {
    const vtubers = await Vtuber.find({}).populate("songs");
    res.status(200).json(vtubers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vtubers" });
  }
};

export const getVtuberById = async (req, res) => {
  try {
    const vtuber = await Vtuber.findById(req.params.id).populate("songs");
    if (!vtuber) {
      return res.status(404).json({ message: "Vtuber not found" });
    }
    res.status(200).json(vtuber);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vtuber" });
  }
};

export const updateVtuber = async (req, res) => {
  try {
    const vtuber = await Vtuber.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!vtuber) {
      return res.status(404).json({ message: "Vtuber not found" });
    }
    res.status(200).json({ message: "Vtuber updated successfully", vtuber });
  } catch (error) {
    res.status(500).json({ message: "Error updating vtuber" });
  }
};

export const deleteVtuber = async (req, res) => {
  try {
    const vtuber = await Vtuber.findByIdAndDelete(req.params.id);
    if (!vtuber) {
      return res.status(404).json({ message: "Vtuber not found" });
    }
    res.status(200).json({ message: "Vtuber deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vtuber" });
  }
};

export const createSongForVtuber = async (req, res) => {
  try {
    const vtuber = await Vtuber.findById(req.params.id);
    if (!vtuber) {
      return res.status(404).json({ message: "Vtuber not found" });
    }
    const song = await Song.create(req.body);
    vtuber.songs.push(song._id);
    await vtuber.save();
    res.status(201).json({ message: "Song created successfully", song });
  } catch (error) {
    console.error("Error creating song:", error);
    res.status(500).json({ message: "Error creating song" });
  }
};

export const getSongByIdForVtuber = async (req, res) => {
  try {
    const vtuber = await Vtuber.findById(req.params.id).populate("songs");
    if (!vtuber) {
      return res.status(404).json({ message: "Vtuber not found" });
    }
    const song = await Song.findById(req.params.songId).populate("vtuber");
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: "Error fetching song" });
  }
};

export const updateSongForVtuber = async (req, res) => {
  try {
    const vtuber = await Vtuber.findById(req.params.id).populate("songs");
    if (!vtuber) {
      return res.status(404).json({ message: "Vtuber not found" });
    }
    const song = await Song.findByIdAndUpdate(req.params.songId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json({ message: "Song updated successfully", song });
  } catch (error) {
    res.status(500).json({ message: "Error updating song" });
  }
};

export const deleteSongForVtuber = async (req, res) => {
  try {
    const vtuber = await Vtuber.findById(req.params.id).populate("songs");
    if (!vtuber) {
      return res.status(404).json({ message: "Vtuber not found" });
    }
    const song = await Song.findByIdAndDelete(req.params.songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting song" });
  }
};
