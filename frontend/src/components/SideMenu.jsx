import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiSolidHome } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";

const SideMenu = () => {
  const [active, setActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActive(pathToActive[location.pathname] || "home");
  }, [location.pathname]);

  const pathToActive = {
    "/": "home",
    "/schedule": "schedule",
    "/latest-episodes": "latest-episodes",
    "/song-list": "song-list",
  };

  return (
    <nav className="nav-bar" style={{ height: "calc(100vh - 6rem)" }}>
      <ul className="flex flex-col gap-3">
        <li
          className={`nav-bar-btn ${
            active === "home" ? "active-nav-bar-btn" : "hover:bg-base-100"
          } `}
          onClick={() => setActive("home")}
        >
          <BiSolidHome size={20} />
          <Link to="/">Home</Link>
        </li>
        <li
          className={`nav-bar-btn ${
            active === "schedule" ? "active-nav-bar-btn" : "hover:bg-base-100"
          }`}
          onClick={() => setActive("schedule")}
        >
          <FaCalendarDays size={20} />
          <Link to="/schedule">Schedule</Link>
        </li>
        <li
          className={`nav-bar-btn ${
            active === "latest-episodes"
              ? "active-nav-bar-btn"
              : "hover:bg-base-100"
          }`}
          onClick={() => setActive("latest-episodes")}
        >
          <FaClock size={20} />
          <Link to="/latest-episodes">Latest Episodes</Link>
        </li>
        <li
          className={`nav-bar-btn ${
            active === "song-list" ? "active-nav-bar-btn" : "hover:bg-base-100"
          }`}
          onClick={() => setActive("song-list")}
        >
          <FaMusic size={20} />
          <Link to="/song-list">Song List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideMenu;
