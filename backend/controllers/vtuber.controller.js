import Vtuber from "../models/vtuber.model.js";
import Song from "../models/song.model.js";
import axios from "axios";

export const createVtuber = async (req, res) => {
  try {
    const { name, twitter } = req.body;
    if (!name || !twitter) {
      return res.status(400).json({ message: "required fields are missing" });
    }

    const customUrl = name
      .split("")
      .filter((letter) => letter.trim())
      .join("");

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&forHandle=${customUrl}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const channel = response.data.items[0];
    if (!channel) {
      return res
        .status(404)
        .json({ message: "Channel not found for the given custom URL" });
    }

    let originalName = "";

    const japaneseMatches = [
      ...channel.snippet.title.matchAll(
        /[\p{sc=Katakana}\p{sc=Hiragana}\p{sc=Han}・ー\s]+/gu
      ),
    ].map((match) => match[0].trim());

    if (japaneseMatches.length > 0) {
      originalName = japaneseMatches.reduce((longest, current) =>
        current.length > longest.length ? current : longest
      );
    }

    const channelId = channel.id;
    const youtubeChannel = `https://www.youtube.com/${
      channel.snippet.customUrl || channelId
    }`;
    const profileImage =
      channel.snippet.thumbnails.high?.url ||
      channel.snippet.thumbnails.default.url;

    const vtuber = await Vtuber.create({
      name,
      originalName,
      profileImage,
      youtubeChannel,
      twitter,
      channelId,
    });
    res.status(201).json(vtuber);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating vtuber", error: error.message });
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
    const {
      name,
      title,
      originalTitle,
      videoUrl,
      coverImage,
      releaseDate,
      composers,
      arrangers,
      lyricists,
      relatedArtists,
      lyrics,
      originalLyrics,
      timestamps,
      original,
    } = req.body;
    
    if (!name || !title || !releaseDate || !lyrics || !timestamps) {
      return res.status(400).json({ message: "required fields are missing" });
    }

    const vtuber = await Vtuber.findOne({ name });
    if (!vtuber) {
      return res.status(404).json({ message: "Vtuber not found" });
    }

    const convertedLyrics = lyrics
      .split("\n")
      .map((line) => line.replace(/\r$/, ""))
      .map((line) => line);
    const convertedOriginalLyrics = originalLyrics
      ? originalLyrics
          .split("\n")
          .map((line) => line.replace(/\r$/, ""))
          .map((line) => line)
      : [];

    const song = await Song.create({
      vtuber: vtuber._id,
      title,
      originalTitle,
      videoUrl: videoUrl || undefined,
      coverImage: coverImage || undefined,
      releaseDate,
      composers: composers ? composers.split(",").map((c) => c.trim()) : [],
      arrangers: arrangers ? arrangers.split(",").map((a) => a.trim()) : [],
      lyricists: lyricists ? lyricists.split(",").map((l) => l.trim()) : [],
      relatedArtists: relatedArtists
        ? relatedArtists.split(",").map((r) => r.trim())
        : [],
      lyrics: convertedLyrics,
      originalLyrics: convertedOriginalLyrics,
      timestamps: JSON.parse(timestamps),
      original,
    });

    vtuber.songs.push(song._id);
    await vtuber.save();

    res.status(201).json(song);
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

export const youtubeSearch = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== "string" || !q.trim()) {
      return res.status(400).json({ message: "Search query is required" });
    }
    
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: q.trim(),
          type: "video",
          maxResults: 15,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    const items = (response.data.items || []).map((item) => ({
      videoId: item.id?.videoId,
      title: item.snippet?.title,
      channelTitle: item.snippet?.channelTitle,
      thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url,
    })).filter((item) => item.videoId);
    res.status(200).json({ items });
  } catch (error) {
    console.error("YouTube search error:", error);
    res.status(500).json({ message: "YouTube search failed", error: error.message });
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
