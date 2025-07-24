import { useEffect, useState } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import { BiSolidHome } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import SongListDropdown from "./SongListDropdown";
import { AnimatePresence } from "framer-motion";

const SideMenu = () => {
  const [active, setActive] = useState("");
  const [songListOpen, setSongListOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let found = "home";
    for (const path in pathToActive) {
      if (matchPath({ path, end: true }, location.pathname)) {
        found = pathToActive[path];
        break;
      }
    }
    setActive(found);
  }, [location.pathname]);

  const pathToActive = {
    "/": "home",
    "/schedule": "schedule",
    "/latest-episodes": "latest-episodes",
    "/anime": "song-list",
    "/vtuber": "song-list",
    "/artist": "song-list",
    "/vtuber/:id": "song-list",
  };

  return (
    <nav className="nav-bar" style={{ height: "calc(100vh - 6rem)" }}>
      <ul className="flex flex-col gap-3">
        <li>
          <Link to="/" className="nav-bar-btn group">
            <BiSolidHome size={20} />
            <p
              className={`group-hover:translate-x-1.5 transition-all duration-200 relative ${
                active === "home" && "translate-x-1.5"
              }`}
            >
              Home
              {active === "home" ? (
                <span className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200 bg-base-content" />
              ) : (
                <span className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200 group-hover:bg-base-content" />
              )}
            </p>
          </Link>
        </li>

        <li>
          <Link to="/schedule" className="nav-bar-btn group">
            <FaCalendarDays size={20} />
            <p
              className={`group-hover:translate-x-1.5 transition-all duration-200 relative ${
                active === "schedule" && "translate-x-1.5"
              }`}
            >
              Schedule
              {active === "schedule" ? (
                <span className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200 bg-base-content" />
              ) : (
                <span className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200 group-hover:bg-base-content" />
              )}
            </p>
          </Link>
        </li>

        <li>
          <Link to="/latest-episodes" className="nav-bar-btn group">
            <FaClock size={20} />
            <p
              className={`group-hover:translate-x-1.5 transition-all duration-200 relative ${
                active === "latest-episodes" && "translate-x-1.5"
              }`}
            >
              Latest Episodes
              {active === "latest-episodes" ? (
                <span className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200 bg-base-content" />
              ) : (
                <span className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200 group-hover:bg-base-content" />
              )}
            </p>
          </Link>
        </li>

        <div>
          <li
            className="nav-bar-btn group"
            onClick={() => setSongListOpen(!songListOpen)}
          >
            <FaMusic size={20} />
            <p
              className={`group-hover:translate-x-1.5 transition-all duration-200 relative ${
                active === "song-list" && "translate-x-1.5"
              }`}
            >
              Song List
              {active === "song-list" ? (
                <span className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200 bg-base-content" />
              ) : (
                <span className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200 group-hover:bg-base-content" />
              )}
            </p>
          </li>
          <AnimatePresence>
            {songListOpen && (
              <SongListDropdown setSongListOpen={setSongListOpen} />
            )}
          </AnimatePresence>
        </div>
      </ul>
    </nav>
  );
};

export default SideMenu;
