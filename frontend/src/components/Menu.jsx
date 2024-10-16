import { useContext } from "react";
import { Usercontext } from "../context/Usercontext";
import axios from "axios";
import { url } from "../../url";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const { user, setuser } = useContext(Usercontext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.get(url + "/api/auth/logout", {
        withCredentials: true,
      });
      setuser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-black w-[200px] flex flex-col items-start absolute top-12 right-8 rounded-lg p-4 space-y-4 md:right-0 z-10">
      {!user && (
        <h3 className="text-sm text-white hover:text-gray-500 cursor-pointer">
          <Link to={"/login"}>Login</Link>
        </h3>
      )}
      {!user && (
        <h3 className="text-sm text-white hover:text-gray-500 cursor-pointer">
          <Link to={"/register"}>Register</Link>
        </h3>
      )}

      {user && (
        <h3 className="text-sm text-white hover:text-gray-500 cursor-pointer">
          <Link to={"/profile/" + user._id}>Profile</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-sm text-white hover:text-gray-500 cursor-pointer">
          <Link to={"/write"}>Write</Link>
        </h3>
      )}
      {user && (
        <h3
          onClick={handleLogout}
          className="text-sm text-white hover:text-gray-500 cursor-pointer"
        >
          Logout
        </h3>
      )}
    </div>
  );
};
export default Menu;
