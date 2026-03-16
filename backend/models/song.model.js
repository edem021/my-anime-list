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
      trim: true,
      default: "",
    },
    videoUrl: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    releaseDate: {
      type: Date,
      required: [true, "Release date is required"],
    },
    composers: {
      type: [String],
      default: [],
    },
    arrangers: {
      type: [String],
      default: [],
    },
    lyricists: {
      type: [String],
      default: [],
    },
    relatedArtists: {
      type: [String],
      default: [],
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
    original: {
      type: Boolean,
      required: [true, "Original is requierd"],
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        key: {
          vtuber: 1,
          title: 1,
          composers: 1,
          arrangers: 1,
          lyricists: 1,
          relatedArtists: 1,
          originalTitle: 1,
        },
        unique: true,
      },
    ],
  }
);

export default model("Song", songSchema);
