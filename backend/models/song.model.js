import { Schema, model } from "mongoose";

const songSchema = new Schema(
  {
    vtuber: {
      type: Schema.Types.ObjectId,
      ref: "Vtuber",
      required: [true, "Vtuber ID is required"],
    },
    title: {
      type: String,
      required: [true, "Song title is required"],
      trim: true,
      minlength: [2, "Song title must be at least 2 characters long"],
    },
    originalTitle: {
      type: String,
      required: [true, "Original title is required"],
      trim: true,
      minlength: [2, "Original title must be at least 2 characters long"],
    },
    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
    },
    coverImage: {
      type: String,
      required: [true, "Cover image URL is required"],
    },
    releaseDate: {
      type: Date,
      required: [true, "Release date is required"],
    },
    composer: {
      type: String,
      required: [true, "Composer name is required"],
      trim: true,
      minlength: [2, "Composer name must be at least 2 characters long"],
    },
    arranger: {
      type: String,
      required: [true, "Arranger name is required"],
      trim: true,
      minlength: [2, "Arranger name must be at least 2 characters long"],
    },
    lyricist: {
      type: String,
      required: [true, "Lyricist name is required"],
      trim: true,
      minlength: [2, "Lyricist name must be at least 2 characters long"],
    },
    relatedArtists: {
      type: [String],
    },
    lyrics: {
      type: [String],
      required: [true, "Lyrics are required"],
    },
    originalLyrics: {
      type: [String],
      required: [true, "Original lyrics are required"],
    },
    timestamps: {
      type: Map,
      of: Number,
      required: [true, "Timestamps are required"],
    },
  },
  {
    timestamps: true,
    indexes: [{ key: { vtuber: 1, title: 1 }, unique: true }],
  }
);

export default model("Song", songSchema);
