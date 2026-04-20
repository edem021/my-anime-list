import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import EditingRow from "./EditingRow";
import Loading from "../../Loading";

const EditSongModal = ({ song, vtuberId, setShowEditSongModal }) => {
  const [loading, setLoading] = useState(false);
  const [editSongForm, setEditSongForm] = useState(song);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const normalizeList = (value) => {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        return String(value)
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      };

      const normalizeLyrics = (value) => {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        return String(value)
          .split("\n")
          .map((line) => line.replace(/\r$/, "")) // strip \r from Windows newlines
          .map((line) => line) // keep empty lines as-is
          .filter((line, index, arr) =>
            index === arr.length - 1 ? line !== "" : true,
          ); // drop trailing blank
      };

      const normalizeTimestamps = (value) => {
        if (!value) return {};
        if (typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch {
            return {};
          }
        }
        return value;
      };

      const payload = {
        title: editSongForm.title,
        originalTitle: editSongForm.originalTitle,
        videoUrl: editSongForm.videoUrl,
        coverImage: editSongForm.coverImage,
        releaseDate: editSongForm.releaseDate,
        composers: normalizeList(editSongForm.composers),
        arrangers: normalizeList(editSongForm.arrangers),
        lyricists: normalizeList(editSongForm.lyricists),
        relatedArtists: normalizeList(editSongForm.relatedArtists),
        lyrics: normalizeLyrics(editSongForm.lyrics),
        originalLyrics: normalizeLyrics(editSongForm.originalLyrics),
        timestamps: normalizeTimestamps(editSongForm.timestamps),
        original: !!editSongForm.original,
      };

      const res = await fetch(
        `http://localhost:5000/api/vtuber/${vtuberId}/song/${song._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update song");
      }

      toast.success("Song updated successfully");
      setShowEditSongModal({ open: false, song: {} });
      // Simple way to reflect changes without complex state wiring
      window.location.reload();
    } catch (error) {
      console.error("Error updating song", error);
      toast.error("Could not update song");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start z-1000 overflow-y-auto">
      <div className="mt-10 mb-10 p-4 rounded-md bg-base-100/85 shadow-md shadow-black w-[1200px] max-h-[92vh] overflow-y-auto">
        <h2 className="text-2xl font-bold flex justify-center pb-5">
          Edit Song
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <EditingRow
              label="Title"
              name="title"
              value={editSongForm.title}
              onChange={(value) =>
                setEditSongForm({ ...editSongForm, title: value })
              }
            />
            <EditingRow
              label="Original Title"
              name="originalTitle"
              value={editSongForm.originalTitle}
              onChange={(value) =>
                setEditSongForm({ ...editSongForm, originalTitle: value })
              }
            />
            <EditingRow
              label="Release Date"
              name="releaseDate"
              value={editSongForm.releaseDate}
              onChange={(value) =>
                setEditSongForm({ ...editSongForm, releaseDate: value })
              }
              type="date"
            />
            <EditingRow
              label="Composers"
              name="composers"
              value={editSongForm.composers}
              onChange={(value) =>
                setEditSongForm({ ...editSongForm, composers: value })
              }
            />
            <EditingRow
              label="Arrangers"
              name="arrangers"
              value={editSongForm.arrangers}
              onChange={(value) =>
                setEditSongForm({ ...editSongForm, arrangers: value })
              }
            />
            <EditingRow
              label="Lyricists"
              name="lyricists"
              value={editSongForm.lyricists}
              onChange={(value) =>
                setEditSongForm({ ...editSongForm, lyricists: value })
              }
            />
            <EditingRow
              label="Related Artists"
              name="relatedArtists"
              value={editSongForm.relatedArtists}
              onChange={(value) =>
                setEditSongForm({ ...editSongForm, relatedArtists: value })
              }
            />
            <EditingRow
              label="Lyrics"
              name="lyrics"
              value={editSongForm.lyrics}
              onChange={(value) =>
                setEditSongForm({ ...editSongForm, lyrics: value })
              }
              type="textarea"
            />
            <EditingRow
              label="Original Lyrics"
              name="originalLyrics"
              value={editSongForm.originalLyrics}
              onChange={(value) =>
                setEditSongForm({ ...editSongForm, originalLyrics: value })
              }
              type="textarea"
            />
            <EditingRow
              label="Timestamps"
              name="timestamps"
              value={editSongForm.timestamps}
              onChange={(value) =>
                setEditSongForm({ ...editSongForm, timestamps: value })
              }
            />
            <EditingRow
              label="Original"
              name="original"
              value={editSongForm.original}
              onChange={(value) =>
                setEditSongForm({ ...editSongForm, original: value })
              }
              type="checkbox"
            />
          </div>

          <div className="pt-5 flex justify-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="rounded-md px-4 py-1 bg-gradient-to-r from-primary to-secondary text-primary-content font-semibold text-lg uppercase tracking-wide cursor-pointer"
            >
              {loading ? (
                <div className="flex gap-1 items-center">
                  <span>Saving...</span>
                  <Loading size={"1.5rem"} />
                </div>
              ) : (
                "Save"
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="rounded-md px-4 py-1 bg-gradient-to-r from-primary to-secondary text-primary-content font-semibold text-lg uppercase tracking-wide cursor-pointer"
              onClick={() => setShowEditSongModal({ open: false, song: {} })}
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSongModal;
