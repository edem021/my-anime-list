import { useRef, useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Loading from "../Loading";
import z from "zod";
import { FaSearch } from "react-icons/fa";

const songSchema = z.object({
  name: z.string().min(2, "The name must be at least 3 chacarters long").trim(),
  title: z
    .string()
    .min(2, "The title must be at least 3 characters long")
    .trim(),
  releaseDate: z
    .string()
    .optional()
    .transform((str) => (str ? str.trim() : ""))
    .refine((str) => !str || !isNaN(Date.parse(str)), {
      message: "Invalid release date format. Use YYYY-MM-DD.",
    }),
  originalTitle: z
    .string()
    .optional()
    .transform((str) => (str ? str.trim() : "")),
  composers: z
    .string()
    .optional()
    .transform((str) => (str ? str.trim() : "")),
  arrangers: z
    .string()
    .optional()
    .transform((str) => (str ? str.trim() : "")),
  lyricists: z
    .string()
    .optional()
    .transform((str) => (str ? str.trim() : "")),
  relatedArtists: z
    .string()
    .optional()
    .transform((str) => (str ? str.trim() : "")),
  lyrics: z.string().transform((str) => (str ? str.trim() : "")),
  originalLyrics: z
    .string()
    .optional()
    .transform((str) => (str ? str.trim() : "")),
  timestamps: z.string().transform((str) => (str ? str.trim() : "")),
  original: z.boolean().default(false),
});

const CreateSongForVtuberForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [songForVtuberForm, setSongForVtuberForm] = useState({
    name: "",
    title: "",
    releaseDate: "",
    originalTitle: "",
    composers: "",
    arrangers: "",
    lyricists: "",
    relatedArtists: "",
    lyrics: "",
    originalLyrics: "",
    timestamps: "",
    original: false,
  });
  const [timestampPairs, setTimestampPairs] = useState([
    { time: "", line: "" },
  ]);
  const navigate = useNavigate();
  const lyricsTextAreaRef = useRef(null);
  const originalLyricsTextAreaRef = useRef(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchedItem, setSearchedItem] = useState("");

  useEffect(() => {
    if (lyricsTextAreaRef.current) {
      lyricsTextAreaRef.current.style.height = "auto";
      lyricsTextAreaRef.current.style.height = `${lyricsTextAreaRef.current.scrollHeight}px`;
    }
  }, [songForVtuberForm.lyrics]);

  useEffect(() => {
    if (originalLyricsTextAreaRef.current) {
      originalLyricsTextAreaRef.current.style.height = "auto";
      originalLyricsTextAreaRef.current.style.height = `${originalLyricsTextAreaRef.current.scrollHeight}px`;
    }
  }, [songForVtuberForm.originalLyrics]);

  useEffect(() => {
    const timestampObject = timestampPairs.reduce((acc, pair) => {
      if (pair.time.trim()) {
        acc[pair.time] = pair.line;
      }
      return acc;
    }, {});

    setSongForVtuberForm((prev) => ({
      ...prev,
      timestamps: JSON.stringify(timestampObject),
    }));
  }, [timestampPairs]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSongForVtuberForm({
      ...songForVtuberForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleTimestampChange = (index, field, value) => {
    const updatedPairs = [...timestampPairs];
    updatedPairs[index] = { ...updatedPairs[index], [field]: value };
    setTimestampPairs(updatedPairs);
  };

  const addTimestampPair = () => {
    setTimestampPairs([...timestampPairs, { time: "", description: "" }]);
  };

  const removeTimestampPair = (index) => {
    if (timestampPairs.length > 1) {
      const updatedPairs = timestampPairs.filter((_, i) => i !== index);
      setTimestampPairs(updatedPairs);
      setSongForVtuberForm({
        ...songForVtuberForm,
        timestamps: JSON.stringify(updatedPairs),
      });
    }
  };

  const handleSearchedTitle = async (title) => {
    const name = songForVtuberForm.name.replace(" ", "");
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name} ${title}&type=video&videoCategoryId=10&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      );
      if (!res.ok) throw new Error("Failed to fetch searched title");
      const data = await res.json();
      const channel = data.items;
      console.log(channel);
    } catch (error) {
      console.error("Error fetching searched title", error);
    }
  };

  const handleSumbit = async (event) => {
    event.preventDefault();

    const result = songSchema.safeParse(songForVtuberForm);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });

      setErrors(fieldErrors);
      toast.error("Please fix your mistakes in the form");
      return;
    }
    setErrors({});

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/vtuber/song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(songForVtuberForm),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      const data = await res.json();

      console.log(data);

      toast.success("Vtuber created successfully");

      navigate("/vtuber");
    } catch (error) {
      console.error("Error sending form data", error);
      toast.error("Couldn't submit form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="border-t border-b border-dashed flex flex-col gap-2 p-5 w-full"
      onSubmit={handleSumbit}
    >
      <h2 className="text-xl">Create Song for Vtuber</h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Vtuber Name"
          value={songForVtuberForm.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errors.name && (
          <p className="text-error text-sm mb-2">{errors.name}</p>
        )}

        <div className="border rounded h-100 p-5 flex flex-col overflow-y-auto">
          <div className="px-4 py-1 rounded-md flex justify-between items-center gap-2 bg-base-100 h-10 shadow-2xs shadow-black">
            <input
              type="text"
              placeholder="Search title (after typing vtuber name first)"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="rounded-md focus:outline-0 pr-2 w-full"
            />
            <FaSearch
              size={18}
              className="cursor-pointer text-neutral-content"
              onClick={() => handleSearchedTitle(searchTitle)}
            />
          </div>
          {errors.title && (
            <p className="text-error text-sm mb-2">{errors.title}</p>
          )}

          <div>{searchedItem && <></>}</div>
        </div>

        <input
          type="date"
          name="releaseDate"
          placeholder="Release Date"
          value={songForVtuberForm.releaseDate}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errors.releaseDate && (
          <p className="text-error text-sm mb-2">{errors.releaseDate}</p>
        )}

        <input
          type="text"
          name="originalTitle"
          placeholder="Original Title"
          value={songForVtuberForm.originalTitle}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errors.originalTitle && (
          <p className="text-error text-sm mb-2">{errors.originalTitle}</p>
        )}

        <input
          type="text"
          name="composers"
          placeholder="Composers"
          value={songForVtuberForm.composers}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errors.composers && (
          <p className="text-error text-sm mb-2">{errors.composers}</p>
        )}

        <input
          type="text"
          name="arrangers"
          placeholder="Arrangers"
          value={songForVtuberForm.arrangers}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errors.arrangers && (
          <p className="text-error text-sm mb-2">{errors.arrangers}</p>
        )}

        <input
          type="text"
          name="lyricists"
          placeholder="Lyricists"
          value={songForVtuberForm.lyricists}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errors.lyricists && (
          <p className="text-error text-sm mb-2">{errors.lyricists}</p>
        )}

        <input
          type="text"
          name="relatedArtists"
          placeholder="Related Artists"
          value={songForVtuberForm.relatedArtists}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errors.relatedArtists && (
          <p className="text-error text-sm mb-2">{errors.relatedArtists}</p>
        )}

        <textarea
          ref={lyricsTextAreaRef}
          name="lyrics"
          placeholder="Lyrics"
          value={songForVtuberForm.lyrics}
          onChange={handleChange}
          className="p-2 border rounded overflow-hidden resize-none"
        />
        {errors.lyrics && (
          <p className="text-error text-sm mb-2">{errors.lyrics}</p>
        )}

        <textarea
          ref={originalLyricsTextAreaRef}
          name="originalLyrics"
          placeholder="Original Lyrics"
          value={songForVtuberForm.originalLyrics}
          onChange={handleChange}
          className="p-2 border rounded overflow-hidden resize-none"
        />
        {errors.originalLyrics && (
          <p className="text-error text-sm mb-2">{errors.originalLyrics}</p>
        )}

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-primary">
            Timestamps
          </label>
          {timestampPairs.map((pair, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Time (seconds only)"
                value={pair.time}
                onChange={(e) =>
                  handleTimestampChange(index, "time", e.target.value)
                }
                className="p-2 border rounded w-1/3"
              />
              <input
                type="text"
                placeholder="Line"
                value={pair.line}
                onChange={(e) =>
                  handleTimestampChange(index, "line", e.target.value)
                }
                className="p-2 border rounded w-2/3"
              />
              {timestampPairs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTimestampPair(index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  −
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addTimestampPair}
            className="self-start p-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200 cursor-pointer"
          >
            + Add Timestamp
          </button>
          {errors.timestamps && (
            <p className="text-error text-sm mb-2">{errors.timestamps}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="original"
            checked={songForVtuberForm.original}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 rounded"
          />
          <label className="text-sm font-medium text-gray-700">
            Original Song
          </label>
        </div>
      </div>

      <div className="pt-5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="rounded-md px-4 py-1 bg-gradient-to-r from-primary to-secondary text-primary-content font-semibold text-lg uppercase tracking-wide cursor-pointer"
        >
          {loading ? (
            <div className="flex gap-1 items-center">
              <span>Creating...</span>
              <Loading size={"1.5rem"} />
            </div>
          ) : (
            "Submit"
          )}
        </motion.button>
      </div>
    </form>
  );
};

export default CreateSongForVtuberForm;
