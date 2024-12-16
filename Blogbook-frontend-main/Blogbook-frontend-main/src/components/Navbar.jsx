import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);

  const showMenu = () => {
    setMenu(!menu);
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 py-4 bg-blue-800 text-white">
      {/* Brand/Logo */}
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/">BlogBook</Link>
      </h1>

      {/* Search Box (Visible on Home Page) */}
      {path === "/" && (
        <div className="flex items-center space-x-2">
          <input
            className="px-3 py-1 rounded-lg outline-none bg-gray-700 text-white"
            type="text"
            placeholder="Search posts"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
            onClick={() => {
              navigate(prompt ? `?search=${prompt}` : "/");
            }}
          >
            <BsSearch className="text-white" />
          </button>
        </div>
      )}

      {/* Menu Links (Desktop) */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/write" className="text-white hover:text-gray-300">
              Write
            </Link>
            <div onClick={showMenu} className="cursor-pointer text-white">
              <FaBars />
              {menu && <Menu />}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="text-white hover:text-gray-300">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Menu Icon (Mobile) */}
      <div className="md:hidden">
        <div onClick={showMenu} className="cursor-pointer text-white">
          <FaBars />
          {menu && <Menu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
