import Navbar from "../components/Navbar";
import ProfilePost from "../components/ProfilePost";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../url";
import { Usercontext } from "../context/Usercontext";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Profile = () => {
  const [loader, setloader] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [post, setpost] = useState([]);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const { user, setuser, getuser } = useContext(Usercontext);
  const navigate = useNavigate();
  const fetchpost = async () => {
    try {
      setemail(user?.email);
      setusername(user?.username);
      const res = await axios.get(url + "/api/posts/user/" + user._id, {
        withCredentials: true,
      });
      console.log(user);
      setpost(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handledelete = async () => {
    try {
      setloader(true);
      const res = await axios.delete(url + "/api/users/" + user._id, {
        withCredentials: true,
      });
      setloader(false);
      setuser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleupdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        url + "/api/users/" + user._id,
        { username, email },
        { withCredentials: true }
      );
      console.log(res.data);
      setusername(res.data.username);
      setemail(res.data.email);
      setUpdated(true);
      getuser();
      fetchpost();
      window.location.reload();
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  useEffect(() => {
    fetchpost();
  }, [user?._id]);
  return (
    <div>
      <Navbar />
      {!loader ? (
        <div className="md:min-h-[411px] px-8  mt-8 lg:px-[200px] gap-16 flex lg:flex-row items-start flex-col-reverse">
          <div className="flex flex-col md:w-[70%] w-full">
            <h1 className="text-xl font-bold ">Your Posts</h1>
            {post.length == 0 && (
              <h3 className=" text-sm mt-12">No posts yet.</h3>
            )}
            {post.map((p, i) => {
              return (
                <Link to={`/posts/post/${p._id}`}>
                  <ProfilePost key={i} p={p} />
                </Link>
              );
            })}
          </div>
          <div className="lg:sticky lg:top-16 flex justify-start  lg:justify-end items-start      md:items-end">
            <div className="flex flex-col space-y-1 items-start border-black border-2 rounded-lg p-4">
              <h1 className="text-xl font-bold ">Profile</h1>

              <div className="flex flex-row justify-start items-center">
                <p className="text-md w-auto">Username:-</p>
                <input
                  value={username}
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                  className="outline-none px-4 py-2 text-gray-500 w-[50%] sm:w-full"
                  placeholder="Your Username"
                  type="text"
                />
              </div>
              <div className="flex flex-row justify-start items-center">
                <p className="w-auto text-md">Email:-</p>
                <input
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  className="outline-none px-4 py-2 w-[70%] sm:w-full text-gray-500"
                  placeholder="Your email"
                  type="email"
                />
              </div>

              <div className="flex items-center w-full justify-center text-center space-x-4 pt-4">
                <button
                  onClick={handleupdate}
                  className="text-white cursor-pointer font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-500"
                >
                  Update
                </button>
                <button
                  onClick={handledelete}
                  className="text-white cursor-pointer font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-500"
                >
                  Delete
                </button>
              </div>
              {updated && (
                <h3 className="text-green-500 text-sm text-center mt-4">
                  User updated successfully!
                </h3>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[50vh] flex justify-center items-center">
          <Loader />
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
};
export default Profile;
