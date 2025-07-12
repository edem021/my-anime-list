import { Link } from "react-router-dom";
import logo from "../assets/my-al-logo.png";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const [searchItem, setSearchItem] = useState("");

  return (
    <header className="header">
      <div className="h-12">
        <Link to="/">
          <img src={logo} alt="MyAl-logo" className="h-full" />
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
        <FaSearch color="white" size={18} className="cursor-pointer" />
      </div>
      <div>
        <Link to="/login" className="login-btn">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
