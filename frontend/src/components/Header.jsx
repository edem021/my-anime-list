import { Link } from "react-router-dom";
import logo from "../assets/suisei-mic.png";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [searchItem, setSearchItem] = useState("");

  return (
    <header className="header">
      <div className="h-22 pt-1">
        <Link to="/">
          <img src={logo} alt="suisei-logo" className="h-full" />
        </Link>
      </div>

      <div className="px-4 py-1 rounded-md flex justify-between items-center gap-2 bg-base-100 w-100 h-10 shadow-2xs shadow-black">
        <input
          type="text"
          placeholder="Search"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="rounded-md focus:outline-0 flex-1 pr-2"
        />
        <FaSearch size={18} className="cursor-pointer text-neutral-content" />
      </div>

      <div className="flex gap-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/create" className="header-btn">
            Create
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/login" className="header-btn">
            Login
          </Link>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
