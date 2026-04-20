import { motion } from "framer-motion";
import { TbEdit } from "react-icons/tb";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { getProxiedImageUrl } from "../utils/getProxiedImageUrl";

const VtuberSong = ({song, toggleFavorite, setShowEditSongModal, favorites}) => {
  return (
    <div
      key={song._id}
      className="flex justify-end border-dashed border-b border-base-content hover:bg-base-200/70 transition-colors duration-200"
    >
      <Link to={`song/${song._id}`} className="flex-1">
        <div className="flex items-center gap-5 ">
          <img
            src={getProxiedImageUrl(song.coverImage)}
            alt={song.title}
            className="w-50 rounded object-cover"
          />
          <div className="flex flex-col">
            <h2 className="text-xl">{song.title}</h2>
            <h3 className="text-sm font-semibold text-base-content/70">
              {song.originalTitle}
            </h3>
          </div>
        </div>
      </Link>

      <div className="flex items-center mr-5 gap-1.5">
        <motion.div
          className="bg-base-content/50 p-1 rounded-full cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowEditSongModal({ open: true, song: song })}
        >
          <TbEdit size={30} color="white" />
        </motion.div>

        <motion.div
          className="bg-base-content/50 p-1 rounded-full cursor-pointer"
          onClick={() => toggleFavorite(song._id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          {favorites[song._id] ? (
            <MdFavorite size={30} color="red" />
          ) : (
            <MdFavoriteBorder size={30} color="white" />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VtuberSong;
