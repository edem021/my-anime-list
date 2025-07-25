import { MdArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SongListDropdown = ({ setSongListOpen }) => {
  return (
    <motion.div
      className={`mt-2 shadow-xs shadow-black ml-8 rounded-sm space-y-1.5`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="hover:translate-x-1.5 transition-transform duration-200 group">
        <Link to="/anime" onClick={() => setSongListOpen(false)}>
          <p className="song-list-dropdown">
            <MdArrowRight size={22} className="group-hover:text-primary" />
            Animes
          </p>
        </Link>
      </div>
      <div className="hover:translate-x-1.5 transition-transform duration-200 group">
        <Link to="/vtuber" onClick={() => setSongListOpen(false)}>
          <p className="song-list-dropdown">
            <MdArrowRight size={22} className="group-hover:text-primary" />
            Vtubers
          </p>
        </Link>
      </div>
      <div className="hover:translate-x-1.5 transition-transform duration-200 group">
        <Link to="/artist" onClick={() => setSongListOpen(false)}>
          <p className="song-list-dropdown">
            <MdArrowRight size={22} className="group-hover:text-primary" />
            Artists
          </p>
        </Link>
      </div>
    </motion.div>
  );
};

export default SongListDropdown;
