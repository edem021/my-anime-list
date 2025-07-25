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
    "/vtuber/:id/song/:songId": "song-list",
  };

  return (
    <nav className="nav-bar" style={{ height: "calc(100vh - 6rem)" }}>
      <ul className="flex flex-col gap-3">
        <li>
          <Link to="/" className="nav-bar-btn group">
            <BiSolidHome size={20} />
            <p
              className={`nav-bar-btn-text ${
                active === "home" && "translate-x-1.5 text-primary"
              }`}
            >
              Home
              {active === "home" ? (
                <span className="active-nav-bar-btn" />
              ) : (
                <span className="inactive-nav-bar-btn" />
              )}
            </p>
          </Link>
        </li>

        <li>
          <Link to="/schedule" className="nav-bar-btn group">
            <FaCalendarDays size={20} />
            <p
              className={`nav-bar-btn-text ${
                active === "schedule" && "translate-x-1.5 text-primary"
              }`}
            >
              Schedule
              {active === "schedule" ? (
                <span className="active-nav-bar-btn" />
              ) : (
                <span className="inactive-nav-bar-btn" />
              )}
            </p>
          </Link>
        </li>

        <li>
          <Link to="/latest-episodes" className="nav-bar-btn group">
            <FaClock size={20} />
            <p
              className={`nav-bar-btn-text ${
                active === "latest-episodes" && "translate-x-1.5 text-primary"
              }`}
            >
              Latest Episodes
              {active === "latest-episodes" ? (
                <span className="active-nav-bar-btn" />
              ) : (
                <span className="inactive-nav-bar-btn" />
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
              className={`nav-bar-btn-text ${
                active === "song-list" && "translate-x-1.5 text-primary"
              }`}
            >
              Song List
              {active === "song-list" ? (
                <span className="active-nav-bar-btn" />
              ) : (
                <span className="inactive-nav-bar-btn" />
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
