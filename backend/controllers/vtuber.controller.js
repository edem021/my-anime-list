import Vtuber from "../models/vtuber.model.js";
import Song from "../models/song.model.js";
import axios from "axios";

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

    if (vtuber.channelId && !vtuber.profileImage) {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${vtuber.channelId}&key=${process.env.YOUTUBE_API_KEY}`
        );
        const channel = res.data.items[0];
        if (channel) {
          vtuber.profileImage = channel.snippet.thumbnails.high.url;
          await vtuber.save();
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching profile image", error });
      }
    }

    res.status(200).json(vtuber);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vtuber", error });
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

    if (vtuber.channelId && !vtuber.profileImage) {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${vtuber.channelId}&key=${process.env.YOUTUBE_API_KEY}`
        );
        const channel = res.data.items[0];
        if (channel) {
          vtuber.profileImage = channel.snippet.thumbnails.high.url;
          await vtuber.save();
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching profile image", error });
      }
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

export const proxyImage = async (req, res) => {
  const { encodedUrl } = req.params;
  const imageUrl = decodeURIComponent(encodedUrl);
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    res.set("Content-Type", response.headers["content-type"]);
    res.set("Access-Control-Allow-Origin", "http://localhost:5173");
    res.set("Cache-Control", "public, max-age=86400");
    res.send(response.data);
  } catch (error) {
    console.error("Error proxying image:", error);
    res.status(500).json({ error: "Failed to proxy image" });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const vtuber = await Vtuber.findById(req.params);
    if (!vtuber) {
      return res.status(404).json({ message: "Vtuber not found" });
    }

    if (!vtuber.channelId) {
      return res.status(400).json({ message: "No channelId provided" });
    }

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${vtuber.channelId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const channel = response.data.items[0];
    if (!channel) throw new Error("Channel not found");

    const profileImage = channel.snippet.thumbnails.high.url;
    vtuber.profileImage = profileImage;
    await vtuber.save();

    res.json({ message: "Profile picture updated", profileImage });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update profile picture", error });
  }
};
