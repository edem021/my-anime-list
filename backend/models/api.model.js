import { Schema, model } from "mongoose";

const apiSchema = new Schema(
  {
    vtubers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vtuber",
      },
    ],
  },
  { timestamps: true }
);

export default model("Api", apiSchema);
