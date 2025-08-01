import Api from "../models/api.model.js";
import Vtuber from "../models/vtuber.model.js";

export const getApiContent = async (req, res) => {
  try {
    const vtubers = await Vtuber.find({}).populate("songs");

    if (!vtubers || vtubers.length === 0) {
      return res.status(404).json({ message: "No Vtuber documents found" });
    }

    let api = await Api.findOne({});

    if (!api) {
      api = new Api({
        vtubers: vtubers.map((vtuber) => vtuber._id),
      });
      await api.save();
    } else {
      api.vtubers = vtubers.map((vtuber) => vtuber._id);
      await api.save();
    }

    await api.populate([{ path: "vtubers", populate: { path: "songs" } }]);

    res.status(200).json(api);
  } catch (error) {
    console.error("Error fetching API content:", error);
    res
      .status(500)
      .json({ message: "Error fetching API content", error: error.message });
  }
};
