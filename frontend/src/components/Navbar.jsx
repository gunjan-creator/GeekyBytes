import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { Usercontext } from "../context/Usercontext";
const Navbar = () => {
  const navigator = useNavigate();
  const [menu, setmenu] = useState(false);
  const showmenu = () => {
    setmenu(!menu);
  };
  const path = useLocation().pathname;
  const { user } = useContext(Usercontext);
  return (
    <div className="flex text-white bg-black items-center justify-between px-6 md:px-[200px] py-5">
      <h1 className="text-xl font-extrabold">
        <Link className="font-serif text-white text-2xl" to="/">
          GeekyBytes
        </Link>
      </h1>

      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {path === "/" && (
          <div className="flex h-8 px-3  bg-white rounded-lg justify-center items-center space-x-0">
            <p className="cursor-pointer text-black">
              <CiSearch />
            </p>
            <input
              onChange={(e) => {
                navigator(e.target.value ? "?search=" + e.target.value : "/");
              }}
              className="outline-none px-3 rounded-lg"
              placeholder="Search a post"
              type="text"
              style={{ color: "black", backgroundColor: "white" }}
            />
          </div>
        )}

        {user ? (
          <h3>
            <Link to="/Write">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div>
            <div onClick={showmenu} className="cursor-pointer relative">
              <FaBars />
              {menu && <Menu />}
            </div>
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div className=" md:hidden text-lg flex items-center justify-center space-x-2 md:space-x-4">
        <div className="flex h-8 px-3  bg-white rounded-lg justify-center items-center space-x-0 w-2/3">
          <p className="cursor-pointer text-black">
            <CiSearch />
          </p>
          <input
            onChange={(e) => {
              navigator(e.target.value ? "?search=" + e.target.value : "/");
            }}
            className="outline-none px-3 rounded-lg  w-2/3 text-black z-10"
            placeholder="Search a post"
            type="text"
            style={{ color: "black", backgroundColor: "white" }}
          />
        </div>
        <div onClick={showmenu}>
          <div className="cursor-pointer relative">
            <FaBars />
            {menu && <Menu />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
