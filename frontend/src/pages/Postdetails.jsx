import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Comments from "../components/Comments";
import { Await, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../url";
import { Usercontext } from "../context/Usercontext";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
const Postdetails = () => {
  const [comment, setcomment] = useState("");
  const [comments, setcomments] = useState([]);
  const { user } = useContext(Usercontext);

  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  const postid = useParams().id;
  const [currentPost, setcurrentPost] = useState({});

  useEffect(() => {
    fetchPost();
    fetchcomments();
  }, [postid]);
  const fetchPost = async () => {
    try {
      setloader(true);
      const res = await axios.get(url + "/api/posts/" + postid, {
        withCredentials: true,
      });
      setcurrentPost(res.data);
      setloader(false);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchcomments = async () => {
    try {
      const res = await axios.get(url + "/api/comments/post/" + postid);
      // console.log(res.data);
      // console.log("hii");
      setcomments(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handledelete = async () => {
    const res = await axios.delete(url + "/api/posts/" + postid, {
      withCredentials: true,
    });
    navigate("/");
  };

  const handlecomment = async (e) => {
    e.preventDefault();
    const newcomment = {
      comment: comment,
      author: user.username,
      userId: user._id,
      postId: postid,
    };

    try {
      const res = await axios.post(url + "/api/comments/create", newcomment, {
        withCredentials: true,
      });
      // console.log(res.data);
      fetchcomments();
      setcomment("");
    } catch (error) {
      console.log(error, "sdsf");
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-6">
          <div className="flex justify-between  items-center ">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {currentPost.title}
            </h1>
            {user?._id === currentPost.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p>
                  <BiEdit
                    className="cursor-pointer"
                    onClick={() => {
                      navigate("/edit/" + postid);
                    }}
                  />
                </p>
                <p className="cursor-pointer" onClick={handledelete}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4 ">
            <p>@{currentPost.username}</p>
            <div className="flex  space-x-2">
              <p>{new Date(currentPost.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(currentPost.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <img
            src={currentPost.photo}
            className="sm:w-2/3 w-full h-2/3 mx-auto mt-8 object-cover"
            alt=""
          />
          <p className="my-8 mx-auto">{currentPost.desc}</p>
          <div className="flex flex-col  items-start my-8 gap-2  font-semibold">
            <p>Categories</p>
            <div className="flex flex-col sm:flex-row justify-start items-start  gap-2">
              {currentPost.categories?.map((c, i) => {
                return (
                  <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                    {c}
                  </div>
                );
              })}
            </div>
          </div>
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          {comments.map((c, i) => {
            return <Comments key={i} fetchcomment={fetchcomments} c={c} />;
          })}

          {/* {comment write} */}
          <div className=" flex flex-col mt-4 md:flex-row">
            <input
              value={comment}
              onChange={(e) => {
                setcomment(e.target.value);
              }}
              className="md:w-[90%] outline-none px-4 py-4 md:mt-0 "
              type="text"
              placeholder="Add a comment"
            />
            <button
              onClick={handlecomment}
              className="cursor-pointer bg-black text-center text-white py-2 px-4 w-[50%] md:w-[20%] mt-4 md:mt-0 rounded-lg"
            >
              Add comment
            </button>
          </div>
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
};
export default Postdetails;
