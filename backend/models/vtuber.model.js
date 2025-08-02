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
      trim: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    youtubeChannel: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      required: [true, "Twitter link required"],
    },
    channelId: {
      type: String,
      default: "",
    },
    songs: {
      type: [Schema.Types.ObjectId],
      ref: "Song",
    },
  },
  {
    timestamps: true,
    indexes: [{ key: { originalName: 1 }, unique: true }],
  }
);

export default model("Vtuber", vtuberSchema);
