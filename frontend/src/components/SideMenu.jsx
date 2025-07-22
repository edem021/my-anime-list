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
        <li>
          <Link
            to="/"
            className={`nav-bar-btn group ${
              active === "home" && "active-nav-bar-btn"
            }`}
          >
            <BiSolidHome size={20} />
            <p className="group-hover:translate-x-1.5 transition-all duration-200 relative">
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200 group-hover:bg-primary" />
            </p>
          </Link>
        </li>

        <li>
          <Link
            to="/schedule"
            className={`nav-bar-btn group ${
              active === "schedule" && "active-nav-bar-btn"
            }`}
          >
            <FaCalendarDays size={20} />
            <p className="group-hover:translate-x-1.5 transition-all duration-200 relative">
              Schedule
              <span className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200 group-hover:bg-primary" />
            </p>
          </Link>
        </li>

        <li>
          <Link
            to="/latest-episodes"
            className={`nav-bar-btn group ${
              active === "latest-episodes" && "active-nav-bar-btn"
            }`}
          >
            <FaClock size={20} />
            <p className="group-hover:translate-x-1.5 transition-all duration-200 relative">
              Latest Episodes
              <span className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200 group-hover:bg-primary" />
            </p>
          </Link>
        </li>

        <div>
          <li>
            <Link
              to="/song-list"
              className={`nav-bar-btn group ${
                active === "song-list" && "active-nav-bar-btn"
              }`}
            >
              <FaMusic size={20} />
              <p className="group-hover:translate-x-1.5 transition-all duration-200 relative">
                Song List
                <span className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-200 group-hover:bg-primary" />
              </p>
            </Link>
          </li>
          <div className={`border space-y-3 ${active === "song-list" && "bg-red-500"}`}>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default SideMenu;
