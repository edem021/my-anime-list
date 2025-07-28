import { Schema, model } from "mongoose";

const vtuberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [2, "Vtuber name must be at least 2 characters long"],
    },
    originalName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [2, "Original name must be at least 2 characters long"],
    },
    profileImage: {
      type: String,
      default: "",
    },
    youtubeChannel: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
      required: true,
    },
    channelId: {
      type: String,
      required: true,
    },
    songs: {
      type: [Schema.Types.ObjectId],
      ref: "Song",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Vtuber", vtuberSchema);
